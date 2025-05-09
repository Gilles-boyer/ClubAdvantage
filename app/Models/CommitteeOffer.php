<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommitteeOffer extends Model
{
    use HasFactory;

    // Laravel vas gérer assigned_at comme une vrai date
    protected $dates = ['assigned_at'];
    
    // Pour pas que Laravel essaye de les insérers automatiquement.
    public $timestamps = false;
}
