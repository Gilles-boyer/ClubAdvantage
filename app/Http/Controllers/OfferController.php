<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;

class OfferController extends Controller {
    // Liste toutes les offres
    public function index() {
        $offers = Offer::with(['creator', 'category', 'committees'])->get();
        return OfferResource::collection($offers);
    }
    
    // Affiche une offre en détail
    public function show(Offer $offer)  {
        $offer->load(['creator', 'category', 'committees']);
        return new OfferResource($offer);
    }

    // Crée une nouvelle offre
    public function store(OfferRequest $request) {
        return new OfferResource(Offer::create($request->validated()));
    }

    // Met à jour une offre existante
    public function update(OfferRequest $request, Offer $offer) {
        $offer->update($request->validated());
        return new OfferResource($offer);
    }

    // Supprime une offre (soft delete)
    public function destroy(Offer $offer) {
        $offer->delete();
        return response()->json(['message' => 'Offre supprimée avec succès.']);
    }
}
