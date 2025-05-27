<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

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
        'remember_token',
    ];

    // Dit à laravel que c'est champs doivent être manipulés comme des dates automatique
    protected $casts = [
        'email_verified_at' => 'datetime',
        'terms_accepted_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Relation : récupère le rôle associé à cet utilisateur (admin, staff, membre, CSE)
    public function roleByName() {
        return $this->belongsTo(Role::class, 'role_name', 'name');
    }
    public function role() {
        return $this->belongsTo(Role::class, 'role_id');
    }


    // Relation : récupère le comité auquel cet utilisateur est rattaché (membre ou CSE)
    public function committee() {
        return $this->belongsTo(Committee::class);
    }

    // Relation : pour les STAFF - récupère les comités créés par cet utilisateur
    public function createdCommittees() {
        return $this->hasMany(Committee::class, 'created_by');
    }

    // Relation : pour les CSE - récupère tous les membres du comité auquel cet utilisateur est rattaché
    public function committeeMembers() {
        return $this->hasMany(User::class, 'committee_id');
    }
}
