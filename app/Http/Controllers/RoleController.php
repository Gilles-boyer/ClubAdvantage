<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return RoleResource::collection(Role::all());
    }

    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    public function store(RoleRequest $request)
    {
        $role = Role::create($request->validated());
        return new RoleResource($role);
    }

    public function update(RoleRequest $request, Role $role)
    {
        // strtolower => transforme une chaine de caractères en minuscules
        if (strtolower($role->name) === 'admin') {
            return response()->json([
                'message' => 'Le rôle admin ne peut pas être modifié.'
            ], 403);
        }

        $role->update($request->validated());
        return new RoleResource($role);
    }

    public function destroy(Role $role)
    {
        if ($role->id === 1) {
            return response()->json([
                'message' => 'Le rôle admin ne peut pas être supprimé.'
            ], 403);
        }

        $role->delete();
        return response()->json(['message' => 'Role supprimée avec succès.']);
    }
}
