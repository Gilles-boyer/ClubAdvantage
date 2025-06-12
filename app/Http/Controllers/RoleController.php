<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller {
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

        // Impossible de modifier l’entrée super_admin elle-même
        if (strtolower($role->name) === 'super_admin') {

            return response()->json([
                'message' => 'Le rôle super_admin ne peut pas être modifié.'
            ], 403);
        }

        // Interdit de transformer un autre rôle en super_admin
        $incoming = $request->validated();

        if (isset($incoming['name']) && strtolower($incoming['name']) === 'super_admin') {

            return response()->json([
                'message' => 'Impossible de renommer un rôle en super_admin.'
            ], 403);
        }
        $role->update($incoming);

        return new RoleResource($role);
    }

    public function destroy(Role $role) {

        if (strtolower($role->name) === 'super_admin') {

            return response()->json([
                'message' => 'Le rôle super_admin ne peut pas être supprimé.'
            ], 403);
        }
        $role->delete();
        
        return response()->json(['message' => 'Role supprimée avec succès.'], 200);
    }
}
