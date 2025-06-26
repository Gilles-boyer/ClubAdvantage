<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Laravel\Pail\ValueObjects\Origin\Console;

class UserController extends Controller
{
    // Paginated user lists, filterable by role (Liste paginée des utilisateurs, filtrable par rôle)
    // Handles index action (Gère l'action index)
    public function index(Request $request)
    {
        $query = User::with(['role', 'committee', 'createdCommittees', 'committeeMembers']);

        if ($request->has('role')) {
            $query->where('role_name', $request->role);
        }

        $users = $query->orderBy('last_name')->orderBy('first_name')->paginate(100000);
        return UserResource::collection($users)->additional([
            'meta' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ]
        ]);
    }

    // Handles show action (Gère l'action show)
    public function show(User $user)
    {
        $user->load(['role', 'committee', 'createdCommittees', 'committeeMembers']);

        $notice = null;
        if (in_array($user->role_name, ['cse_member', 'cse_admin']) && empty($user->committee_id)) {
            $notice = 'Attention : ce membre ou CSE n’est pas rattaché à un comité.';
        }

        return response()->json([
            'user' => new UserResource($user),
            'notice' => $notice,
        ]);
    }

    // Handles store action (Gère l'action store)
    public function store(UserRequest $request)
    {
        $data = $request->validated();

        // ─── Prevent the creation of multiple super_admins ─── (Empêcher la création de plusieurs super_admin)
        $superAdminRole = Role::where('name', 'super_admin')->first();
        if (
            $superAdminRole &&
            $data['role_id'] === $superAdminRole->id &&
            User::where('role_id', $superAdminRole->id)->exists()
        ) {
            return response()->json([
                'message' => 'Un super-admin existe déjà, vous ne pouvez pas en créer un deuxième.'
            ], 403);
        }

        // Automatically fills role_name from role_id (Remplit automatiquement role_name à partir du role_id)
        $data['role_name'] = Role::find($data['role_id'])->name;

        // Password hashing before creation (Hash du mot de passe avant création)
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        // Notice if CSE role without committee (Notice si rôle CSE sans comité)
        $notice = null;
        if (in_array($data['role_name'], ['cse_member', 'cse_admin']) && empty($data['committee_id'])) {
            $notice = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $notice,
        ], 201);
    }

    // Handles update action (Gère l'action update)
    public function update(UserRequest $request, User $user)
    {
        // Cannot modify the super_admin itself (Impossible de modifier le super_admin lui-même)
        if ($user->role_name === 'super_admin') {
            return response()->json([
                'message' => 'Cet utilisateur ne peut pas être modifié.'
            ], 403);
        }

        // Cannot demote a staff (Impossible de démouvoir un staff)
        $staffRole = Role::where('name', 'staff')->first();
        if (
            $staffRole &&
            $user->role_id === $staffRole->id &&
            $request->filled('role_id') &&
            $request->role_id !== $staffRole->id
        ) {
            return response()->json([
                'message' => 'Le rôle staff ne peut pas être modifié.'
            ], 403);
        }

        // TODO Also secures the assignment of a super_admin to another user (Sécurise aussi l’attribution d’un super_admin à un autre user)
        $superAdminRole = Role::where('name', 'super_admin')->first();
        if (
            $superAdminRole &&
            $request->filled('role_id') &&
            $request->role_id === $superAdminRole->id &&
            User::where('role_id', $superAdminRole->id)
            ->where('id', '!=', $user->id)
            ->exists()
        ) {
            return response()->json([
                'message' => 'Un super-admin existe déjà. Impossible d’en donner ce rôle.'
            ], 403);
        }

        $data = $request->validated();

        // Updates automatiquement role_name si role_id changé (Met à jour automatiquement role_name si role_id changé)
        if (isset($data['role_id'])) {
            $data['role_name'] = Role::find($data['role_id'])->name;
        }

        // TODO Hash password if modified (Hachage du mot de passe si modifié)
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $user->load(['role', 'committee', 'createdCommittees', 'committeeMembers']);

        // Notice if CSE role without committee (Notice si rôle CSE sans comité)
        $notice = null;
        if (in_array($user->role_name, ['cse_member', 'cse_admin']) && empty($user->committee_id)) {
            $notice = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $notice,
        ]);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(User $user)
    {
        // Cannot delete a super_admin (Impossible de supprimer un super_admin)
        if ($user->role_name === 'super_admin') {
            return response()->json([
                'message' => 'Cet utilisateur ne peut pas être supprimé.'
            ], 403);
        }

        $user->delete();
        return response()->json([
            'message' => 'Utilisateur supprimé avec succès.'
        ]);
    }

    // TODO Retrieves the profile of the logged-in user (Récupère le profil de l’utilisateur connecté)
    // Handles me action (Gère l'action me)
    public function me(Request $request)
    {
        try {
            $user = $request->user();

            // TODO If for any reason the user is not authenticated (Si pour une raison quelconque l’utilisateur n’est pas authentifié)
            if (! $user) {
                return response()->json([
                    'error'   => 'Utilisateur non authentifié',
                ], 401);
            }

            // TODO Everything is OK, we send the data back (Tout est OK, on renvoie les données)
            return response()->json([
                'data' => new UserResource($user),
            ], 200);
        } catch (\Exception $e) {
            // TODO We log the error in back (On log l’erreur en back)
            Log::error('Erreur dans AuthController@me : ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            // TODO A JSON 500 response is returned with the message (On renvoie une réponse JSON 500 avec le message)
            return response()->json([
                'error'   => 'Une erreur est survenue',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Updating logged-in user profile (Mise à jour du profil de l’utilisateur connecté)
    // Handles updateProfile action (Gère l'action updateProfile)
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name'  => ['sometimes', 'string', 'max:255'],
            'email'      => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        if (empty($validated)) {
            return response()->json(['message' => 'Aucun champ fourni.'], 422);
        }

        $user->update($validated);
        return response()->json([
            'message' => 'Profil mis à jour.',
            'data'    => new UserResource($user),
        ]);
    }

    // Updating password of logged-in user (Mise à jour du mot de passe de l’utilisateur connecté)
    // Handles updatePassword action (Gère l'action updatePassword)
    public function updatePassword(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'current_password' => ['required'],
            'new_password'     => ['required', 'min:8', 'confirmed'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect.'], 422);
        }

        $user->update(['password' => Hash::make($validated['new_password'])]);
        return response()->json(['message' => 'Mot de passe modifié avec succès.']);
    }

    // Deactivate logged-in user account (soft delete)
    // Handles deleteAccount action (Gère l'action deleteAccount)
    public function deleteAccount(Request $request)
    {
        $user = $request->user();
        $user->delete();
        return response()->json(['message' => 'Compte désactivé.']);
    }
}
