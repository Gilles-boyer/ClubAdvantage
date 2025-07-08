<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Handles login action (Gère l'action login)
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email'     => ['required', 'email'],
            'password'  => ['required', 'string', 'min:8'],
        ]);

        // Login attempt for connexion + remember optionnel (Tentative de connexion + remember optionnel)
        if (!Auth::attempt($credentials, remember: true)) {
            Log::warning('Tentative de connexion échouée pour : ' . $credentials['email']);

            return response()->json(['message' => '🔴 Identifiants invalides'], 401);
        }

        // Session fixation security (Sécurité session fixation)
        $request->session()->regenerate();

        // TODO Token Sanctum (Token Sanctum)
        $token = $request->user()->createToken('toto')->plainTextToken;

        Log::info('Connexion réussie pour : ' . $request->user()->email);

        return response()->json([
            'message'   => '✅ Connecté avec succès',
            'user'      => new UserResource($request->user()),
            'token'     => $token,
        ], 200);
    }

    // Handles logout action (Gère l'action logout)
    public function logout(Request $request)
    {

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté'], 200);
    }
}
