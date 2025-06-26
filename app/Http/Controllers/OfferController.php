<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\JsonResponse;

class OfferController extends Controller
{
    // Handles index action (Gère l'action index)
    public function index(): JsonResponse
    {

        $offers = Offer::with(['creator', 'category', 'committees'])->get();
        $offers = OfferResource::collection($offers);

        return response()->json([
            'message' => 'Liste des offres récupérée avec succès.',
            'data'    => OfferResource::collection($offers),
        ], 200);
    }

    // Handles show action (Gère l'action show)
    public function show(Offer $offer): JsonResponse
    {

        $offer->load(['creator', 'category', 'committees']);

        return response()->json([
            'message' => 'Offre récupéré avec succès.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    // Handles store action (Gère l'action store)
    public function store(OfferRequest $request): JsonResponse
    {

        $offer = Offer::create($request->validated());

        return response()->json([
            'message' => 'Offre créée avec succès.',
            'data'    => new OfferResource($offer),
        ], 201);
    }

    // Handles update action (Gère l'action update)
    public function update(OfferRequest $request, Offer $offer): JsonResponse
    {

        $offer->update($request->validated());

        return response()->json([
            'message' => 'Catégorie mise à jour.',
            'data'    => new OfferResource($offer),
        ], 200);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(Offer $offer)
    {

        $offer->delete();

        return response()->json([
            'message' => 'Offre supprimée avec succès.'
        ], 200);
    }
}
