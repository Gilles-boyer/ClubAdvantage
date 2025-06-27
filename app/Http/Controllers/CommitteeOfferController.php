<?php

namespace App\Http\Controllers;

use App\Models\CommitteeOffer;
use App\Http\Requests\CommitteeOfferRequest;
use App\Http\Resources\CommitteeOfferResource;

class CommitteeOfferController extends Controller
{
    // Handles index action (Gère l'action index)
    public function index()
    {
        return CommitteeOfferResource::collection(CommitteeOffer::all());
    }

    // Handles show action (Gère l'action show)
    public function show(CommitteeOffer $committeeOffer)
    {
        return new CommitteeOfferResource($committeeOffer);
    }

    // Handles store action (Gère l'action store)
    public function store(CommitteeOfferRequest $request)
    {
        return new CommitteeOfferResource(
            CommitteeOffer::create($request->validated())
        );
    }

    // Handles update action (Gère l'action update)
    public function update(CommitteeOfferRequest $request, CommitteeOffer $committeeOffer)
    {
        $committeeOffer->update($request->validated());
        return new CommitteeOfferResource($committeeOffer);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(CommitteeOffer $committeeOffer)
    {
        $committeeOffer->delete();
        return response()->json(['message' => 'Offre retirée du comité avec succès.']);
    }
}
