<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

/**
* 
*@OA\Info(
*   title="Club Advantage API",
*   version="1.0.0",
*   description="Documentation de l’API Club Advantage"
*)
*/
class SwaggerTestController extends Controller
{
 /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Liste des utilisateurs",
     *     tags={"Utilisateurs"},
     *     @OA\Response(
     *         response=200,
     *         description="Succès",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return User::all();
    }
    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Créer un utilisateur",
     *     tags={"Utilisateurs"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"first_name", "last_name", "email", "password", "role_id"},
     *             @OA\Property(property="first_name", type="string"),
     *             @OA\Property(property="last_name", type="string"),
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="password", type="string", format="password"),
     *             @OA\Property(property="role_id", type="integer"),
     *             @OA\Property(property="committee_id", type="integer", nullable=true),
     *             @OA\Property(property="email_verified_at", type="string", format="date-time"),
     *             @OA\Property(property="terms_accepted_at", type="string", format="date-time"),
     *             @OA\Property(property="status", type="string"),
     *             @OA\Property(property="remember_token", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Créé avec succès"),
     *     @OA\Response(response=400, description="Erreur de validation")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'         => 'required|string',
            'last_name'          => 'required|string',
            'email'              => 'required|email|unique:users',
            'password'           => 'required|string|min:6',
            'role_id'            => 'required|integer',
            'committee_id'       => 'nullable|integer',
            'email_verified_at'  => 'nullable|date',
            'terms_accepted_at'  => 'nullable|date',
            'status'             => 'nullable|string',
            'remember_token'     => 'nullable|string|max:60',
        ]);

        // Valeurs par défaut
        $validated['password'] = bcrypt($validated['password']);
        $validated['status'] = 'active';
        $validated['terms_accepted_at'] = now();
        $validated['email_verified_at'] = now();
        $validated['remember_token'] = Str::random(60);

        return response()->json(User::create($validated), 201);
    }
}
