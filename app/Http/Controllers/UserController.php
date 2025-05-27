<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Role;

class UserController extends Controller {

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
            
        $usersData = $users->map(function ($user) {
            $userResource = new UserResource($user);
    
            $notice = null;
            if (in_array($user->role_name, ['cse_member', 'cse_admin']) && empty($user->committee_id)) {
                $notice = 'Ce membre ou CSE n’est pas rattaché à un comité.';
            }
            return [
                'user' => $userResource,
                'notice' => $notice,
            ];
        });
        return response()->json(['data' => $usersData]);
    }

    public function show(User $user) {
        $user->load(['role', 'committee', 'createdCommittees', 'committeeMembers']);
    
        $message = null;
        if (in_array($user->role_name, ['cse_member', 'cse_admin']) && empty($user->committee_id)) {
            $message = 'Attention : ce membre ou CSE n’est pas rattaché à un comité.';
        }
    
        return response()->json([
            'user' => new UserResource($user),
            'notice' => $message,
        ]);
    }

    public function store(UserRequest $request) {
        $data = $request->validated();

        // 🔄 Remplit automatiquement role_name à partir du role_id
        if (isset($data['role_id'])) {
            $data['role_name'] = \App\Models\Role::find($data['role_id'])?->name;
        }

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        $message = null;
        if (in_array($data['role_name'], ['cse_member', 'cse_admin']) && empty($data['committee_id'])) {
            $message = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $message,
        ], 201);
    }

    public function update(UserRequest $request, User $user) {
        if ($user->role_name === 'super_admin') {
            return response()->json(['message' => 'Cet utilisateur ne peut pas être modifié.'], 403);
        }

        $data = $request->validated();

        // 🔄 Met à jour automatiquement role_name si role_id changé
        if (isset($data['role_id'])) {
            $data['role_name'] = \App\Models\Role::find($data['role_id'])?->name;
        }

        // Hachage du mot de passe si modifié
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        $message = null;
        $roleName = $data['role_name'] ?? $user->role_name;
        $committeeId = $data['committee_id'] ?? $user->committee_id;

        if (in_array($roleName, ['cse_member', 'cse_admin']) && empty($committeeId)) {
            $message = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user'   => new UserResource($user),
            'notice' => $message,
        ]);
    }

    public function destroy(User $user) {
        if ($user->role_name === 'super_admin') {
            return response()->json(['message' => 'Cet utilisateur ne peut pas être supprimé.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }
                
    // Retourne les informations du compte connecté (utilisé pour afficher le profil)
    public function me() {
        return response()->json([
            'data' => new  UserResource(User::first())
        ]);
    }

    // Met à jour les informations de base du profil utilisateur connecté
    public function updateProfile(Request $request)
    {
        $user = $request->user(); // récupère l'utilisateur actuellement connecté

        // Valide les champs envoyés
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profil mis à jour.',
            'data'    => new UserResource($user),
        ]);
    }

    // Met à jour le mot de passe de l'utilisateur connecté
    public function updatePassword(Request $request)
    {
        $user = $request->user(); 

        // Valide les champs nécessaires
        $validated = $request->validate([
            'current_password' => ['required'], 
            'new_password'     => ['required', 'min:8', 'confirmed'], 
        ]);

        // Vérifie que le mot de passe actuel est correct
        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Mot de passe actuel incorrect.'], 422);
        }

        // Si tout est ok, met à jour le mot de passe après hashage
        $user->update(['password' => Hash::make($validated['new_password'])]);

        return response()->json(['message' => 'Mot de passe modifié avec succès.']);
    }

    // Supprime (désactive) le compte de l'utilisateur connecté via soft delete
    public function deleteAccount(Request $request)
    {
        $user = $request->user(); 

        $user->delete(); // soft delete : l'utilisateur n'est pas supprimé physiquement

        return response()->json(['message' => 'Compte désactivé.']);
    }
}
