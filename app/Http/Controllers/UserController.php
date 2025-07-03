<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function qrPayload(Request $request)
    {
        $user = $request->user();

        // si pas encore généré → on le crée puis on le garde
        if (!$user->qr_token) {
            $user->qr_token = Str::uuid()->toString();  // ou Str::random(40)
            $user->save();
        }

        return response()->json(['payload' => $user->qr_token]);
    }

    // Paginated user lists, filterable by role (Liste paginée des utilisateurs, filtrable par rôle)
    // Handles index action (Gère l'action index)
    public function index(Request $request)
    {
        $query = User::with(['role', 'committee']);

        if ($request->has('role')) {
            $query->where('role_name', $request->role);
        }

        $users = $query->orderBy('last_name')
            ->orderBy('first_name')
            ->paginate(100000);

        return UserResource::collection($users)->additional([
            'meta' => [
                'total'        => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page'    => $users->lastPage(),
            ],
        ]);
    }

    // Handles show action (Gère l'action show)
    public function show(User $user)
    {
        $user->load(['role', 'committee']);

        $notice = null;
        if (
            in_array($user->role_name, ['cse_admin', 'cse_member'], true)
            && is_null($user->committee_id)
        ) {
            $notice = 'Attention : ce membre ou CSE n’est pas rattaché à un comité.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $notice,
        ]);
    }

    // Handles store action (Gère l'action store)
    public function store(UserRequest $request)
    {
        $data = $request->validated();

        // ─── Prevent the creation of multiple super_admins ─── (Empêcher la création de plusieurs super_admin)
        $superAdminId = Role::where('name', RoleEnum::SUPER_ADMIN->value)->value('id');
        if (
            $data['role_id'] === $superAdminId
            && User::where('role_id', $superAdminId)->exists()
        ) {
            abort(403, 'Un super-admin existe déjà.');
        }

        // Automatically fills role_name from role_id (Remplit automatiquement role_name à partir du role_id)
        $data['role_name'] = Role::findOrFail($data['role_id'])->name; // findOrFail : garantit que le role_id est valide.

        // Password hashing before creation (Hash du mot de passe avant création)
        $data['password']  = Hash::make($data['password']);

        $user = User::create($data);

        // Notice if CSE role without committee (Notice si rôle CSE sans comité)
        $notice = null;
        if (
            in_array($user->role_name, [RoleEnum::CSE_ADMIN->value, RoleEnum::CSE_MEMBER->value], true)
            && is_null($user->committee_id)
        ) {
            $notice = 'Attention : ce rôle nécessite un comité.';
        }

        return (new UserResource($user))
            ->additional(['notice' => $notice])
            ->response()
            ->setStatusCode(201);
    }

    // Handles update action (Gère l'action update)
    public function update(UserRequest $request, User $user)
    {
        // Cannot modify the super_admin itself (Impossible de modifier le super_admin lui-même)
        if ($user->role_name === RoleEnum::SUPER_ADMIN->value) {
            abort(403, 'Le super-admin ne peut pas être modifié.');
        }

        $data = $request->validated();

        // Cannot demote a staff (Impossible de démouvoir un staff)
        if (isset($data['role_id'])) {
            $staffId = Role::where('name', RoleEnum::STAFF->value)->value('id');
            if ($user->role_id === $staffId && $data['role_id'] !== $staffId) {
                abort(403, 'Le rôle staff ne peut pas être modifié.');
            }

            // TODO Also secures the assignment of a super_admin to another user (Sécurise aussi l’attribution d’un super_admin à un autre user)
            $superId = Role::where('name', RoleEnum::SUPER_ADMIN->value)->value('id');
            if (
                $data['role_id'] === $superId
                && User::where('role_id', $superId)
                ->where('id', '!=', $user->id)
                ->exists()
            ) {
                abort(403, 'Un super-admin existe déjà.');
            }

            // Updates automatiquement role_name si role_id changé (Met à jour automatiquement role_name si role_id changé)
            $data['role_name'] = Role::findOrFail($data['role_id'])->name;

            // TODO Hash password if modified (Hachage du mot de passe si modifié)
            if (! empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }

            $user->update($data);
            $user->refresh()->load(['role', 'committee']);

            // Notice if CSE role without committee (Notice si rôle CSE sans comité)
            $notice = null;
            if (
                in_array($user->role_name, [RoleEnum::CSE_ADMIN->value, RoleEnum::CSE_MEMBER->value], true)
                && is_null($user->committee_id)
            ) {
                $notice = 'Attention : ce rôle nécessite un comité.';
            }

            return response()->json([
                'user'   => new UserResource($user),
                'notice' => $notice,
            ]);
        }
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(User $user)
    {
        if ($user->role_name === RoleEnum::SUPER_ADMIN->value) {
            abort(403, 'Le super-admin ne peut pas être supprimé.');
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé.']);
    }

    // TODO Retrieves the profile of the logged-in user (Récupère le profil de l’utilisateur connecté)
    // Handles me action (Gère l'action me)
    public function me(Request $request)
    {
        $user = $request->user()?->load('role');

        // TODO If for any reason the user is not authenticated (Si pour une raison quelconque l’utilisateur n’est pas authentifié)
        if (! $user) {
            abort(401, 'Utilisateur non authentifié.');
        }
        // TODO Everything is OK, we send the data back (Tout est OK, on renvoie les données)
        return response()->json([
            'user' => new UserResource($user),
        ], 200);
    }

    // Updating logged-in user profile (Mise à jour du profil de l’utilisateur connecté)
    // Handles updateProfile action (Gère l'action updateProfile)
    public function updateProfile(Request $request)
    {
        $user      = $request->user();
        
        $validated = $request->validate([
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name'  => ['sometimes', 'string', 'max:255'],
            'email'      => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        if (empty($validated)) {
            abort(422, 'Aucun champ fourni.');
        }


        $user->update($validated);

        return response()->json([
            'message' => 'Profil mis à jour.',
            'data'    => new UserResource($user->refresh()),
        ], 200);
    }

    // Updating password of logged-in user (Mise à jour du mot de passe de l’utilisateur connecté)
    // Handles updatePassword action (Gère l'action updatePassword)
    public function updatePassword(Request $request)
    {
        $user      = $request->user();
        
        $validated = $request->validate([
            'current_password' => ['required'],
            'new_password'     => ['required', 'min:8', 'confirmed'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            abort(422, 'Mot de passe actuel incorrect.');
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json([
            'message' => 'Mot de passe modifié avec succès.',
        ], 200);
    }

    // Deactivate logged-in user account (soft delete)
    // Handles deleteAccount action (Gère l'action deleteAccount)
    public function deleteAccount(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return response()->json([
            'message' => 'Compte désactivé.',
        ], 200);
    }
}
