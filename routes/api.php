<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

// Cette seule ligne génère automatiquement toutes les routes classiques (index, show, store, update, destroy)
Route::apiResource('roles', RoleController::class);
    // Route::get('/roles', [RoleController::class, 'index']);
    // Route::get('/roles/{role}', [RoleController::class, 'show']);
    // Route::post('/roles', [RoleController::class, 'store']);
    // Route::put('/roles/{role}', [RoleController::class, 'update']);
    // Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

Route::apiResource('offers', OfferController::class);

Route::apiResource('users', UserController::class);

Route::apiResource('committees', CommitteeController::class);
