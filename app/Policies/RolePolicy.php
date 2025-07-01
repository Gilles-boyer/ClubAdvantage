<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Role;
use App\Models\User;

class RolePolicy
{
    /* Super-admin → tous droits, les autres → aucun */
    public function before(User $user): ?bool
    {
        if (! $user) {
            return null;           // pas d’utilisateur -> laisser Laravel renvoyer 401/403
        }
    // renvoie true si super_admin, null sinon (pour passer aux autres méthodes)
        return $user->hasRole(RoleEnum::SUPER_ADMIN);
    }

    /* Les méthodes ci-dessous ne seront jamais appelées pour les non-super-admin,
       mais on les déclare pour être complet. */
    public function viewAny(User $user): bool           { return true; }
    public function view(User $user, Role $role): bool     { return true; }
    public function create(User $user): bool            { return true; }
    public function update(User $user, Role $role): bool   { return true; }
    public function delete(User $user, Role $role): bool   { return true; }
}
