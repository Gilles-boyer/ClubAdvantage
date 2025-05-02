<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SwaggerTestController;

Route::get('/users', [SwaggerTestController::class, 'index']);
Route::post('/users', [SwaggerTestController::class, 'store']);
