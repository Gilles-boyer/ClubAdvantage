<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Committee extends Model {
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'agreement_start_date',
        'agreement_end_date',
        'auto_renew',
        'created_by',
        'is_active',
    ];

    protected $casts = [
        'agreement_start_date' => 'date',
        'agreement_end_date'   => 'date',
        'auto_renew'           => 'boolean',
        'is_active'            => 'boolean',
    ];

    /** Qui a créé ce comité */
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** Membres « CSE » rattachés */
    public function members(): HasMany {
        return $this->hasMany(User::class, 'committee_id');
    }

    // TODO: remplacer users() par members() partout, puis supprimer users()
    public function users(): HasMany {
        return $this->members();
    }
    
    protected static function booted(): void {

        // 1) Soft-delete classique
        static::deleting(function (Committee $committee) {
            $committee->members()->delete();
        });
        
        // 2) Update du champ is_active
        static::updating(function (Committee $committee) {

            if ($committee->isDirty('is_active')) {
                if ($committee->is_active === false) {
                    // tous les users rattachés deviennent inactifs
                    $committee->members()->update(['status' => 'inactive']);
                } else {
                    // on réactive uniquement ceux qui étaient inactifs
                    $committee->members()->where('status', 'inactive')->update(['status' => 'active']);
                }
            }
        });
    }
}
