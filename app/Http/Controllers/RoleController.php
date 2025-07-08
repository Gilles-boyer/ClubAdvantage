<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller
{
    // Autorisation automatique via RolePolicy
    public function __construct()
    {
        $this->authorizeResource(Role::class, 'role');
    }

    // TODO The 4 main roles that must not be changed or removed (Les 4 rôles principaux qu’on ne doit pas modifier ou supprimer)
    private array $reserved = [
        RoleEnum::SUPER_ADMIN->value,
        RoleEnum::STAFF->value,
        RoleEnum::CSE_ADMIN->value,
        RoleEnum::CSE_MEMBER->value,
    ];


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
        $name = strtolower($request->validated()['name']);

        // - ── Prohibits the creation of a second super_admin ─── (Interdit de créer un second super_admin)
        // TODO strtolower => transforms a string into lowercase characters (transforme une chaine de caractères en minuscules)
        if ($name === RoleEnum::SUPER_ADMIN->value && Role::where('name', $name)->exists()) {
            abort(403, 'Le rôle super_admin existe déjà.');
        }

        $role = Role::create($request->validated());
        return new RoleResource($role);
    }

    // Handles update action (Gère l'action update)
    public function update(RoleRequest $request, Role $role)
    {
        // Cannot modify one of the main roles (Impossible de modifier l’un des rôles principaux)
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            abort(403, 'Les rôles principaux ne peuvent pas être modifiés.');
        }

        // TODO Not allowed to transform another role into one of the main ones (Interdit de transformer un autre rôle en l’un des rôles principaux)
        $new = strtolower($request->validated()['name'] ?? '');

        if ($new !== '' && in_array($new, $this->reserved, true)) {
            abort(403, 'Impossible de renommer un rôle en l’un des rôles principaux.');
        }

        $role->update($request->validated());
        return new RoleResource($role);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(Role $role)
    {
        // Cannot remove one of the main roles (Impossible de supprimer l’un des rôles principaux)
        if (in_array(strtolower($role->name), $this->reserved, true)) {
            abort(403, 'Les rôles principaux ne peuvent pas être supprimés.');
        }

        $role->delete();
        return response()->json(['message' => 'Role supprimée avec succès.'], 200);
    }
}
