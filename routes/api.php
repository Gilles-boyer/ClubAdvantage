<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\CommitteeOfferController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// CSRF pour Sanctum (automatiquement exposé par sanctum config)
Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

// Auth
Route::post('/login',  [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Route qui renvoie simplement l’utilisateur connecté
Route::middleware('auth:sanctum')->group(function () {
    Route::get   ('user/me',        [UserController::class, 'me']);
    Route::patch ('user/me',        [UserController::class, 'updateProfile']);
    Route::patch ('user/password',  [UserController::class, 'updatePassword']);
    Route::delete('user/me',        [UserController::class, 'deleteAccount']);
});

// Route renvoyant les pages
Route::apiResources([
    'categories'      => CategoryController::class,
    'roles'           => RoleController::class,
    'offers'          => OfferController::class,
    'users'           => UserController::class,
    'committees'      => CommitteeController::class,
    'committee-offers'=> CommitteeOfferController::class,
    'scans'           => ScanController::class,
]);

// Route::middleware('web')->group(function () {
//     Route::post('/login',  [AuthController::class, 'login']);
//     Route::post('/logout', [AuthController::class, 'logout']);
// });

/** Exemple détailler de la Route categories: */ 
/* 
* Route::get('/categories', [CategoryController::class, 'index']);
* Route::get('/categories/{category}', [CategoryController::class, 'show']);
* Route::post('/categories', [CategoryController::class, 'store']);
* Route::put('/categories/{category}', [CategoryController::class, 'update']);
* Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
*/ 

/** Cette seule ligne génère automatiquement toutes les routes classiques (index, show, store, update, destroy) */
/* Route::apiResource('categories', CategoryController::class);*/ 
