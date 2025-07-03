<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Enums\RoleEnum;



class OfferController extends Controller
{
    // Handles index action (Gère l'action index)
    public function index(): JsonResponse
{
    $user = Auth::user();

    // Si c'est un super admin → toutes les offres
    if (in_array($user->role_name, ["super_admin", "staff"])) {
        $offers = Offer::with(['creator', 'category', 'committees'])->get();
    } else {
        // Sinon, uniquement celles liées au comité du user
        $committeeId = $user->committee_id;

        $offers = Offer::whereHas('committees', function ($query) use ($committeeId) {
            $query->where('committees.id', $committeeId);
        })->with(['creator', 'category', 'committees'])->get();
    }

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
