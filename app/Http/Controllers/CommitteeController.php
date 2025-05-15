<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use App\Http\Requests\CommitteeRequest;
use App\Http\Resources\CommitteeResource;
use Illuminate\Http\Request;

class CommitteeController extends Controller {
    public function index() {
        return CommitteeResource::collection(Committee::all());
    }

    public function show(Committee $committee) {
        return new CommitteeResource($committee);
    }

    public function store(CommitteeRequest $request)
    {
        $data = $request->validated();
            // Si l'utilisateur n'a pas rempli la date de fin de contrat,
            // on la génère automatiquement en fin d'année à partir de la date de début.
        if (empty($data['agreement_end_date']) && !empty($data['agreement_start_date'])) {
            $start = \Carbon\Carbon::parse($data['agreement_start_date']);
            $data['agreement_end_date'] = $start->copy()->endOfYear();
        }
        $committee = Committee::create($data);
        return new CommitteeResource($committee);
    }

    public function update(CommitteeRequest $request, Committee $committee) {
        $committee->update($request->validated());
        return new CommitteeResource($committee);
    }

    public function destroy(Committee $committee) {
        $committee->delete();
        return response()->json(['message' => 'Comité supprimé avec succès.']);
    }
}
