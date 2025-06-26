<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller
{
    // TODO The 4 main roles that must not be changed or removed (Les 4 rôles principaux qu’on ne doit pas modifier ou supprimer)
    private array $reserved = ['super_admin', 'staff', 'cse_admin', 'cse_member'];

    // Handles index action (Gère l'action index)
    public function index()
    {
        return RoleResource::collection(Role::all());
    }

    // Handles show action (Gère l'action show)
    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    // Handles store action (Gère l'action store)
    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        // - ── Prohibits the creation of a second super_admin ─── (Interdit de créer un second super_admin)
        // TODO strtolower => transforms a string into lowercase characters (transforme une chaine de caractères en minuscules)
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

    // Handles update action (Gère l'action update)
    public function update(RoleRequest $request, Role $role)
    {
        // Cannot modify one of the main roles (Impossible de modifier l’un des rôles principaux)
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            return response()->json([
                'message' => 'Les rôles principaux ne peuvent pas être modifiés.'
            ], 403);
        }

        // TODO Not allowed to transform another role into one of the main ones (Interdit de transformer un autre rôle en l’un des rôles principaux)
        $incoming = $request->validated();
        if (isset($incoming['name']) && in_array(strtolower($incoming['name']), $this->reserved, true)) {
            return response()->json([
                'message' => 'Impossible de renommer un rôle en l’un des rôles principaux.'
            ], 403);
        }

        $role->update($incoming);
        return new RoleResource($role);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(Role $role)
    {
        // Cannot remove one of the main roles (Impossible de supprimer l’un des rôles principaux)
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            return response()->json([
                'message' => 'Les rôles principaux ne peuvent pas être supprimés.'
            ], 403);
        }

        $role->delete();
        return response()->json(['message' => 'Role supprimée avec succès.'], 200);
    }
}
