<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Committee extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'agreement_start_date',
        'agreement_end_date',
        'auto_renew',
        'created_by',
    ];
}
