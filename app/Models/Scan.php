<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** La méthode belongsTo() définit une relation 
*   de un à plusieurs dans le modèle de la table secondaire de la relation.
 */ 

class Scan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'scanned_at',
        'scanned_by',
        'user_id',
    ];

    // Le membre du staff qui a scanné.
    public function scannedBy(): BelongsTo {
        return $this->belongsTo(User::class, 'scanned_by');
    }

    // Le membre CSE qui s'est fait scanner.
    public function scannedUser(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
