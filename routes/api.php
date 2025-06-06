<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\CommitteeOfferController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
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

Route::apiResource('offers', OfferController::class);

Route::apiResource('users', UserController::class);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::apiResource('committees', CommitteeController::class);

Route::apiResource('scans', ScanController::class);

Route::apiResource('committee-offers', CommitteeOfferController::class);

Route::get('user/me', [UserController::class, 'me']);
Route::put('user/me', [UserController::class, 'updateProfil']);

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::put('/password', [UserController::class, 'updatePassword']);
    Route::delete('/me', [UserController::class, 'deleteAccount']);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }
    // $request->session()->regenerate();
    return response()->json(['message' => 'Connecté avec succès']);
});

Route::get('/api/scan/uuid/{uuid}', [ScanController::class, 'handleUuidScan']);
