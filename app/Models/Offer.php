<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'title',
        'description',
        'is_active',
        'created_by',
        'category_id',
    ];

    // Relation : L'utilisateur qui a créé l'offre
    public function creator() 
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relation : La catégorie associée à l'offre
    public function category() 
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
