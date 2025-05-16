<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request) {
        $query = User::with(['role', 'committee', 'createdCommittees', 'committeeMembers']);
    
        if ($request->has('role')) {
            $query->where('role_name', $request->role);
        }
    
        $users = $query->orderBy('last_name')->orderBy('first_name')->pagination(15);
    
        return UserResource::collection($users)->additional([
            'meta' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ]
            ]);
            
        // Ajout de notices
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
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        $message = null;
        if ( in_array($data['role_name'], ['cse_member', 'cse_admin']) && empty($data['committee_id'])) {
            $message = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user' => new UserResource($user),
            'notice' => $message,
        ], 201);
    }

    public function update(UserRequest $request, User $user) {
        if ($user->role_name === 'super_admin') {
            return response()->json(['message' => 'Cet utilisateur ne peut pas être modifié.'], 403);
        }

        $data = $request->validated();

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
            $message = 'Attention : ce rôle nécessite uncomité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user' => new UserResource($user),
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
}
