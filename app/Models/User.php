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
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

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
        'qr_token',
        'remember_token',
    ];

    // Cache le mdp et le token
    protected $hidden = ['password', 'remember_token', 'qr_token'];

    // Dit à laravel que c'est champs doivent être manipulés comme des dates automatique
    protected $casts = [
        'email_verified_at' => 'datetime',
        'terms_accepted_at' => 'datetime',
        'deleted_at'        => 'datetime',
        'role_name'         => RoleEnum::class,
    ];

    /* -----------------------------------------------------------------
     |  Relations
     | ----------------------------------------------------------------- */

    // Relation : récupère le rôle associé à cet utilisateur (admin, staff, membre, CSE)
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);   // clé étrangère = role_id
    }

    public function committee(): BelongsTo
    {
        return $this->belongsTo(Committee::class); // clé étrangère = committee_id
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

    /* -----------------------------------------------------------------
     |  Helpers
     | ----------------------------------------------------------------- */

    // Vérifie si l’utilisateur possède le rôle demandé.
    public function hasRole(RoleEnum|string $role): bool
    {
        return $this->role?->name === ($role instanceof RoleEnum ? $role->value : $role);
    }

    // Accessor facultatif : permet d’accéder à `$user->committee_name`
    // sans dupliquer la colonne dans la BDD.
    public function getCommitteeNameAttribute(): ?string
    {
        return $this->committee?->name;
    }

    public static function idFromQrToken(string $token): ?int
    {
        try {
            return (int) Crypt::decryptString($token);
        } catch (DecryptException) {
            return null;
        }
    }

    protected static function booted(): void
    {
        static::saving(function (User $user) {
            // Synchronise role_name / role_id
            if ($user->isDirty('role_id') && $user->role) {
                $user->role_name = $user->role->name;
            }

            if ($user->isDirty('role_name') && ! $user->isDirty('role_id')) {
                $user->role_id = Role::where('name', $user->role_name)->value('id');
            }

            // Synchronise committee_id (pas de committee_name désormais)
            if ($user->isDirty('committee_id') && $user->committee) {
            }
        });
        
        /* --- Génération du QR-token à la création --- */
        static::created(function (User $user) {
            if (!$user->qr_token) {
                // On chiffre simplement l’ID ; ajoute du sel ou un payload JSON si besoin.
                $user->qr_token = Crypt::encryptString($user->id);
                // saveQuietly → évite le déclenchement d’un deuxième cycle d’événements
                $user->saveQuietly();
            }
        });
    }
}
