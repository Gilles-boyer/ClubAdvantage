<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            // 🔴 Log en cas d'échec de connexion
            Log::warning('Tentative de connexion échouée pour : ' . $credentials['email']);

            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        // ✅ Log en cas de succès
        Log::info('Connexion réussie pour : ' . $request->user()->email);

        return response()->json(['message' => 'Connecté avec succès']);
    }
}
