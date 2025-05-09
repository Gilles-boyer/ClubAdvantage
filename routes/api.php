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

Route::get('/roles', [RoleController::class, 'index']);
Route::get('/roles/{role}', [RoleController::class, 'show']);
Route::post('/roles', [RoleController::class, 'store']);
Route::put('/roles/{role}', [RoleController::class, 'update']);
Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/{offer}', [OfferController::class, 'show']);
Route::post('/offers', [OfferController::class, 'store']);
Route::put('/offers/{offer}', [OfferController::class, 'update']);
Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);


// Cette seule ligne génère automatiquement toutes les routes REST classiques (index, show, store, update, destroy)
Route::apiResource('committees', CommitteeController::class);
    // Route::get('/committees', [CommitteeController::class, 'index']);
    // Route::get('/committees/{committee}', [CommitteeController::class, 'show']);
    // Route::post('/committees', [CommitteeController::class, 'store']);
    // Route::put('/committees/{committee}', [CommitteeController::class, 'update']);
    // Route::delete('/committees/{committee}', [CommitteeController::class, 'destroy']);