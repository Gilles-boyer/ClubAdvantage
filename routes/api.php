<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\CommitteeOfferController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// CSRF pour Sanctum (automatiquement exposé par sanctum config)
Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

// Auth publiques
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/logout',   [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);

// Si on passe ici, le jeton/cookie est valide
Route::middleware('auth:sanctum')->get('/auth/validate', function (Request $request) {
    try {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['valid' => false], 401);
        }
        
        return response()->json([
            'valid' => true,
            'user'  => $user->only(['id', 'name', 'email']),
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Internal server error'], 500);
    }
});

// Route qui renvoie simplement l’utilisateur connecté
Route::middleware('auth:sanctum')->group(function () {
    Route::get   ('user/me',        [UserController::class, 'me']);
    Route::patch ('user/me',        [UserController::class, 'updateProfile']);
    Route::patch ('user/password',  [UserController::class, 'updatePassword']);
    Route::delete('user/me',        [UserController::class, 'deleteAccount']);
    Route::get   ('/stats',         [StatsController::class,'index']);
    Route::post  ('/invitations',   [InvitationController::class, 'store']);
    Route::get   ('user/qrcode',    [UserController::class, 'qrPayload']);

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
});
