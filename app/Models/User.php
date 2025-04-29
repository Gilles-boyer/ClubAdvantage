<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at',
        'terms_accepted_at',
        'status',
        'role_id',
        'committee_id',
        'remember_token',
    ];
 // Dit à laravel que c'est champs doivent être manipulés comme des dates automatique
    protected $casts = [
        'email_verified_at' => 'datetime',
        'terms_accepted_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];
}