<?php

namespace App\Http\Controllers;

use App\Models\CommitteeOffer;
use App\Http\Requests\CommitteeOfferRequest;
use App\Http\Resources\CommitteeOfferResource;

class CommitteeOfferController extends Controller {
    public function index() {
        return CommitteeOfferResource::collection(CommitteeOffer::all());
    }

    public function show(CommitteeOffer $committeeOffer) {
        return new CommitteeOfferResource($committeeOffer);
    }

    public function store(CommitteeOfferRequest $request) {
        return new CommitteeOfferResource(
            CommitteeOffer::create($request->validated())
        );
    }

    public function update(CommitteeOfferRequest $request, CommitteeOffer $committeeOffer) {
        $committeeOffer->update($request->validated());
        return new CommitteeOfferResource($committeeOffer);
    }

    public function destroy(CommitteeOffer $committeeOffer) {
        $committeeOffer->delete();
        return response()->json(['message' => 'Offre retirée du comité avec succès.']);
    }
}
