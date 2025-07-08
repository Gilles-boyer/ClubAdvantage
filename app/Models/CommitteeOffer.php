<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;   // ou Pivot si tu l’utilises

class CommitteeOffer extends Model
{
    use HasFactory;

    public $timestamps  = false;   // ← si ta table n’a pas created_at / updated_at
    public $incrementing = false;  // clé composite
    protected $table     = 'committee_offers';
    protected $primaryKey = null;  // pas de PK auto-incrément

    protected $casts = ['assigned_at' => 'datetime']; // Laravel vas gérer assigned_at comme une vrai date

    protected $fillable = [
        'committee_id',
        'offer_id',
        'assigned_at',
    ];

    /* ---------------- RELATIONS ---------------- */

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
