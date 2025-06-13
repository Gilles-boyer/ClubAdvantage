<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class UserController extends Controller {
    // Liste paginée des utilisateurs, filtrable par rôle
    public function index(Request $request) {
        $query = User::with(['role', 'committee', 'createdCommittees', 'committeeMembers']);
    
        if ($request->has('role')) {
            $query->where('role_name', $request->role);
        }
    
        $users = $query->orderBy('last_name')->orderBy('first_name')->paginate(30);
        return UserResource::collection($users)->additional([
            'meta' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ]
        ]);
    }
            
    // Détail d’un utilisateur
    public function show(User $user) {
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

    // Création d’un nouvel utilisateur
    public function store(UserRequest $request) {
        $data = $request->validated();

        // ─── Empêcher la création de plusieurs super_admin ───
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

        // Remplit automatiquement role_name à partir du role_id
        $data['role_name'] = Role::find($data['role_id'])->name;

        // Hash du mot de passe avant création
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        // Notice si rôle CSE sans comité
        $notice = null;
        if (in_array($data['role_name'], ['cse_member', 'cse_admin']) && empty($data['committee_id'])) {
            $notice = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $notice,
        ], 201);
    }


    // Mise à jour d’un utilisateur existant
    public function update(UserRequest $request, User $user) {
        // Impossible de modifier le super_admin lui-même
        if ($user->role_name === 'super_admin') {
            return response()->json([
                'message' => 'Cet utilisateur ne peut pas être modifié.'
            ], 403);
        }

        // Impossible de démouvoir un staff
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

        // Sécurise aussi l’attribution d’un super_admin à un autre user
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

        // Met à jour automatiquement role_name si role_id changé
        if (isset($data['role_id'])) {
            $data['role_name'] = Role::find($data['role_id'])->name;
        }

        // Hachage du mot de passe si modifié
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $user->load(['role', 'committee', 'createdCommittees', 'committeeMembers']);

        // Notice si rôle CSE sans comité
        $notice = null;
        if (in_array($user->role_name, ['cse_member', 'cse_admin']) && empty($user->committee_id)) {
            $notice = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $notice,
        ]);
        
    }
    
     // Suppression (soft delete) d’un utilisateur
    public function destroy(User $user) {
        // Impossible de supprimer un super_admin
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

    // Récupère le profil de l’utilisateur connecté
    public function me(Request $request) {
        return response()->json([
            'data' => new UserResource($request->user())
        ]);
    }

    // Mise à jour du profil de l’utilisateur connecté
    public function updateProfile(Request $request) {
        $user = $request->user();
        $validated = $request->validate([
            'first_name' => ['sometimes','string','max:255'],
            'last_name'  => ['sometimes','string','max:255'],
            'email'      => ['sometimes','email','max:255','unique:users,email,'.$user->id],
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

    // Mise à jour du mot de passe de l’utilisateur connecté
    public function updatePassword(Request $request) {
        $user = $request->user();
        $validated = $request->validate([
            'current_password' => ['required'],
            'new_password'     => ['required','min:8','confirmed'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect.'], 422);
        }

        $user->update(['password' => Hash::make($validated['new_password'])]);
        return response()->json(['message' => 'Mot de passe modifié avec succès.']);
    }

    // Désactivation du compte de l’utilisateur connecté (soft delete)
    public function deleteAccount(Request $request) {
        $user = $request->user();
        $user->delete();
        return response()->json(['message' => 'Compte désactivé.']);
    }
}