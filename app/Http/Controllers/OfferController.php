<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\JsonResponse;

class OfferController extends Controller {
    // Liste toutes les offres
    public function index(): JsonResponse {

        $offers = Offer::with(['creator', 'category', 'committees'])->get();
        $offers = OfferResource::collection($offers);

        return response()->json([
            'message' => 'Liste des offres récupérée avec succès.',
            'data'    => OfferResource::collection($offers),
        ], 200);
    }

    // Affiche une offre en détail
    public function show(Offer $offer): JsonResponse  {

        $offer->load(['creator', 'category', 'committees']);

        return response()->json([
            'message' => 'Offre récupéré avec succès.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    // Crée une nouvelle offre
    public function store(OfferRequest $request): JsonResponse {

        $offer = Offer::create($request->validated());

        return response()->json([
            'message' => 'Offre créée avec succès.',
            'data'    => new OfferResource($offer),
        ], 201);
    }

    // Met à jour une offre existante
    public function update(OfferRequest $request, Offer $offer): JsonResponse {

        $offer->update($request->validated());

        return response()->json([
            'message' => 'Catégorie mise à jour.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    // Supprime une offre (soft delete)
    public function destroy(Offer $offer) {

        $offer->delete();
        
        return response()->json([
            'message' => 'Offre supprimée avec succès.'
        ], 200);
    }
}
