<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller {
    public function login(Request $request) {
        $credentials = $request -> validate([
            'email'     => ['required', 'email'],
            'password'  => ['required','string','min:8'],
        ]);

        // Tentative de connexion + remember optionnel
        if (!Auth::attempt($credentials,remember: true)) {
            Log::warning('Tentative de connexion échouée pour : ' . $credentials['email']);

            return response()-> json(['message'=> '🔴 Identifiants invalides'], 401);
        }

        // Sécurité session fixation
        $request-> session()->regenerate();

        // Token Sanctum
        $token = $request-> user()-> createToken('toto')-> plainTextToken;

        Log::info('Connexion réussie pour : ' .$request->user()->email);

        return response()->json([
            'message'   => '✅ Connecté avec succès',
            'user'      => $request-> user(),
            'token'     => $token,
        ]);
    }

    public function logout(Request $request) {
        Auth::guard('web')-> logout();
        $request-> session()-> invalidate();
        $request-> session()-> regenerateToken();

        return response()-> json(['message' => 'Déconnecté']);
    }
}