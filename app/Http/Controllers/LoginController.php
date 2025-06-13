<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // 1) Récupération et validation comme tu l’as déjà
        $credentials = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required','string','min:8'],
        ]);

        // 2) Pour débug : logger EN CLAIR (à retirer en prod !)
        Log::debug('Login attempt payload:', [
            'email'    => $credentials['email'],
            'password' => $credentials['password'],
        ]);

        // 3) Tentative d'authentification
        if (! Auth::attempt($credentials, true)) {
            Log::warning('Tentative de connexion échouée pour : ' . $credentials['email']);
            return response()->json([
                'message' => '🔴 Identifiants invalides'
            ], 401);
        }

        // 4) Sécurité et génération du token
        $request->session()->regenerate();
        $token = $request->user()->createToken('toto')->plainTextToken;
        Log::info('Connexion réussie pour : ' . $request->user()->email);

        // 5) Réponse JSON
        return response()->json([
            'message' => '✅ Connecté avec succès',
            'user'    => new UserResource($request->user()),
            'token'   => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté'], 200);
    }
}
