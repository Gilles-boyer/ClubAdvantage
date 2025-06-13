<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller {
    // Les 4 rôles principaux qu’on ne doit pas modifier ou supprimer
    private array $reserved = ['super_admin', 'staff', 'cse_admin', 'cse_member'];

    public function index() {
        return RoleResource::collection(Role::all());
    }

    public function show(Role $role) {
        return new RoleResource($role);
    }

    public function store(RoleRequest $request) {
        $data = $request->validated();

        // ─── Interdit de créer un second super_admin ───
        // strtolower => transforme une chaine de caractères en minuscules
        if (strtolower($data['name'] ?? '') === 'super_admin') { 

            $exists = Role::where('name', 'super_admin')->exists();

            if ($exists) {
                return response()->json([
                    'message' => 'Le rôle super_admin existe déjà.'
                ], 403);
            }
        }

        $role = Role::create($data);
        return new RoleResource($role);
    }

    public function update(RoleRequest $request, Role $role) {
        // Impossible de modifier l’un des rôles principaux
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            return response()->json([
                'message' => 'Les rôles principaux ne peuvent pas être modifiés.'
            ], 403);
        }

        // Interdit de transformer un autre rôle en l’un des rôles principaux
        $incoming = $request->validated();
        if (isset($incoming['name']) && in_array(strtolower($incoming['name']), $this->reserved, true)) {
            return response()->json([
                'message' => 'Impossible de renommer un rôle en l’un des rôles principaux.'
            ], 403);
        }
        
        $role->update($incoming);
        return new RoleResource($role);
    }

    public function destroy(Role $role) {
        // Impossible de supprimer l’un des rôles principaux
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            return response()->json([
                'message' => 'Les rôles principaux ne peuvent pas être supprimés.'
            ], 403);
        }
        
        $role->delete();
        return response()->json(['message' => 'Role supprimée avec succès.'], 200);
    }
}
