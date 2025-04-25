<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'title',
        'description',
        'is_active',
        'created_by',
        'category_id',
    ];
}
