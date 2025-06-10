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
Route::apiResource('committees', CommitteeController::class);
Route::apiResource('committee-offers', CommitteeOfferController::class);
Route::apiResource('scans', ScanController::class);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get   ('user/me',[UserController::class, 'me']);
    Route::patch ('user/me',[UserController::class, 'updateProfile']);
    Route::patch ('user/password',[UserController::class, 'updatePassword']);
    Route::delete('user/me',[UserController::class, 'deleteAccount']);
});

Route::middleware('web')->group(function () {
    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (! Auth::attempt($credentials, remember: true)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $request->session()->regenerate();   // StartSession présent ✅

        return response()->json([
            'message' => 'Connecté',
            'user'    => $request->user(),
        ]);
    });
});

Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Déconnecté']);
});


// A remplacer plus tard

// use App\Http\Controllers\{
//     CategoryController, CommitteeController, CommitteeOfferController,
//     RoleController, OfferController, ScanController, UserController
// };
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Route;

// /* ─────────────────────────  ROUTES PUBLIQUES  ───────────────────────── */

// Route::post('/login', function (Request $request) {
//     $credentials = $request->validate([
//         'email'    => 'required|email',
//         'password' => 'required',
//     ]);

//     if (! Auth::attempt($credentials, remember: true)) {
//         return response()->json(['message' => 'Identifiants invalides'], 401);
//     }

//     $request->session()->regenerate();

//     return response()->json([
//         'message' => 'Connecté',
//         'user'    => $request->user(),
//     ]);
// });


// /* Ressources accessibles sans auth (ex. catalogue produits) */
// Route::apiResource('categories', CategoryController::class);
// Route::apiResource('offers',      OfferController::class);

// /* ────────────────────────  ROUTES PROTÉGÉES SANCTUM  ─────────────────────── */

// Route::middleware('auth:sanctum')->group(function () {

//     // Profil connecté
//     Route::get   ('user/me',       [UserController::class, 'me']);
//     Route::patch ('user/me',       [UserController::class, 'updateProfile']);
//     Route::patch ('user/password', [UserController::class, 'updatePassword']);
//     Route::delete('user/me',       [UserController::class, 'deleteAccount']);

//     // Ressources uniquement pour les connectés
//     Route::apiResource('users',            UserController::class);
//     Route::apiResource('roles',            RoleController::class);
//     Route::apiResource('committees',       CommitteeController::class);
//     Route::apiResource('committee-offers', CommitteeOfferController::class);
//     Route::apiResource('scans',            ScanController::class);

//     Route::post('/logout', function (Request $request) {
//         Auth::guard('web')->logout();
//         $request->session()->invalidate();
//         $request->session()->regenerateToken();
//         return response()->json(['message' => 'Déconnecté']);
//     });
// });
