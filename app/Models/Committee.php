<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Committee extends Model {
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'name',
        'agreement_start_date',
        'agreement_end_date',
        'auto_renew',
        'created_by',
    ];
    
    protected $casts = [
        'agreement_start_date' => 'date',
        'agreement_end_date'   => 'date',
        'auto_renew'           => 'boolean',
    ];

    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members(): HasMany {
        return $this->hasMany(User::class, 'committee_id');
    }

    // TODO: remplacer users() par members() partout, puis supprimer users()
    public function users(): HasMany {
        return $this->members();
    }

}
