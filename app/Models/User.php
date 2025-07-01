<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Committee;
use App\Models\Role;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at',
        'terms_accepted_at',
        'status',
        'role_id',
        'role_name',
        'committee_id',
        'committee_name',
        'remember_token',
    ];

    // Cache le mdp et le token
    protected $hidden = ['password', 'remember_token'];

    // Dit à laravel que c'est champs doivent être manipulés comme des dates automatique
    protected $casts = [
        'email_verified_at' => 'datetime',
        'terms_accepted_at' => 'datetime',
        'deleted_at'        => 'datetime',
    ];

    // Relation : récupère le rôle associé à cet utilisateur (admin, staff, membre, CSE)
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);   // clé étrangère = role_id
    }
    public function hasRole(RoleEnum|string $role): bool
    {
        return $this->role?->name === ($role instanceof RoleEnum ? $role->value : $role);
    }

    protected static function booted(): void
    {
        static::saving(function (User $user) {
            // Sync role_name ← role_id
            if ($user->isDirty('role_id') && $user->role) {
                $user->role_name = $user->role->name;
            }

            // Si on modifie role_name « manuellement », ajuste role_id
            if ($user->isDirty('role_name') && ! $user->isDirty('role_id')) {
                $user->role_id = Role::where('name', $user->role_name)->value('id');
            }

            // Sync committee_name ← committee_id
            if ($user->isDirty('committee_id') && $user->committee) {
                $user->committee_name = $user->committee->name;
            }

            // Idem dans l’autre sens (rare, mais ça évite les oublis)
            if ($user->isDirty('committee_name') && ! $user->isDirty('committee_id')) {
                $user->committee_id = Committee::where('name', $user->committee_name)->value('id');
            }
        });
    }

    // Relation : récupère le comité auquel cet utilisateur est rattaché (membre ou CSE)
    // public function committeeByName()
    // {
    //     return $this->belongsTo(Committee::class, 'committee_name', 'name');
    // }
    public function committee()
    {
        return $this->belongsTo(Committee::class, 'committee_id');
    }

    // Relation : pour les STAFF - récupère les comités créés par cet utilisateur
    public function createdCommittees()
    {
        return $this->hasMany(Committee::class, 'created_by');
    }

    // Relation : pour les CSE - récupère tous les membres du comité auquel cet utilisateur est rattaché
    public function committeeMembers()
    {
        return $this->hasMany(User::class, 'committee_id');
    }
}
