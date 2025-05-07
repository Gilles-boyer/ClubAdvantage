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
        $query = User::with(['role', 'committee']);
    
        if ($request->has('role')) {
            $query->where('role_id', $request->role);
        }
    
        $users = $query->get();
    
        // Ajout de notices
        $usersData = $users->map(function ($user) {
            $userResource = new UserResource($user);
    
            $notice = null;
            if (in_array($user->role_id, [3, 4]) && empty($user->committee_id)) {
                $notice = 'Ce membre ou CSE n’est pas rattaché à un comité.';
            }
    
            return [
                'user' => $userResource,
                'notice' => $notice,
            ];
        });
    
        return response()->json(['data' => $usersData]);
    }

    public function show(User $user)
    {
        $user->load(['role', 'committee']);
    
        $message = null;
        if (in_array($user->role_id, [3, 4]) && empty($user->committee_id)) {
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

        if (
            in_array($data['role_id'], [3, 4]) &&
            empty($data['committee_id'])
        ) {
            $message = 'Attention : ce rôle nécessite un comité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user' => new UserResource($user),
            'notice' => $message,
        ], 201);
    }

    public function update(UserRequest $request, User $user) {
        if ($user->id === 1 || strtolower($user->name) === 'admin') {
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
        $roleId = $data['role_id'] ?? $user->role_id;
        $committeeId = $data['committee_id'] ?? $user->committee_id;

        if (in_array($roleId, [3, 4]) && empty($committeeId)) {
            $message = 'Attention : ce rôle nécessite uncomité. Veuillez l’ajouter plus tard.';
        }

        return response()->json([
            'user' => new UserResource($user),
            'notice' => $message,
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id === 1 || strtolower($user->name) === 'admin') {
            return response()->json(['message' => 'Cet utilisateur ne peut pas être supprimé.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }
}