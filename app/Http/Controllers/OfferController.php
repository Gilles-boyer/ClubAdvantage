<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Offer;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


class OfferController extends Controller
{
    // Handles index action (Gère l'action index)
    public function index(): JsonResponse
    {
        $user = Auth::user();
        $role  = $user->role_name;

        // 🚀 SUPER_ADMIN ou STAFF ➜ aucune restriction
        if ($role === RoleEnum::SUPER_ADMIN || $role === RoleEnum::STAFF) {
            $offers = Offer::with(['creator', 'category', 'committees'])->get();
        }
        // 🔒 Rôles CSE ➜ seulement les offres de leur comité
        else {
            $offers = Offer::whereHas('committees', function ($q) use ($user) {
                $q->where('committees.id', $user->committee_id);
            })
                ->with(['creator', 'category', 'committees'])
                ->get();
        }

        return response()->json([
            'message' => 'Liste des offres récupérée avec succès.',
            'data'    => OfferResource::collection($offers),
        ], 200);
    }

    /* -----------------------------------------------------------------
     |  Affiche une offre
     | ----------------------------------------------------------------- */
    public function show(Offer $offer): JsonResponse
    {
        $user = Auth::user();
        $role = $user->role_name;

        if (
            ! $role->is(RoleEnum::SUPER_ADMIN)
            && ! $role->is(RoleEnum::STAFF)
            && ! $offer->committees->contains('id', $user->committee_id)
        ) {
            abort(403, 'Accès refusé à cette offre.');
        }

        $offer->load(['creator', 'category', 'committees']);

        return response()->json([
            'message' => 'Offre récupérée avec succès.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    /* -----------------------------------------------------------------
     |  Crée une offre
     | ----------------------------------------------------------------- */
    public function store(OfferRequest $request): JsonResponse
    {
        $offer = Offer::create($request->validated());

        return response()->json([
            'message' => 'Offre créée avec succès.',
            'data'    => new OfferResource($offer),
        ], 201);
    }

    /* -----------------------------------------------------------------
     |  Met à jour une offre
     | ----------------------------------------------------------------- */
    public function update(OfferRequest $request, Offer $offer): JsonResponse
    {
        $offer->update($request->validated());

        return response()->json([
            'message' => 'Offre mise à jour.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    /* -----------------------------------------------------------------
     |  Supprime une offre (soft delete OU delete selon ton modèle)
     | ----------------------------------------------------------------- */
    public function destroy(Offer $offer): JsonResponse
    {
        $offer->delete();

        return response()->json([
            'message' => 'Offre supprimée avec succès.',
        ], 200);
    }
}
