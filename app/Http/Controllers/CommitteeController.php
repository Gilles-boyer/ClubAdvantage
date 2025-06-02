<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use App\Http\Requests\CommitteeRequest;
use App\Http\Resources\CommitteeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommitteeController extends Controller {
    public function index() {
        return CommitteeResource::collection(Committee::all());
    }

    public function show(Committee $committee) {
        return new CommitteeResource($committee);
    }

    public function store(CommitteeRequest $request) {
        $data = $request->validated();

        // Ajoute une date de début si absente
        if (empty($data['agreement_start_date'])) {
            $data['agreement_start_date'] = now();
        }

        // Ajoute une date de fin si absente (fin d'année de la date de début)
        if (empty($data['agreement_end_date'])) {
            $start = \Carbon\Carbon::parse($data['agreement_start_date']);
            $data['agreement_end_date'] = $start->copy()->endOfYear();
        }

        $committee = Committee::create($data);
        return new CommitteeResource($committee);
    }

    public function update(CommitteeRequest $request, Committee $committee)
    {
        // On récupère les champs validés dans le formulaire (name, auto_renew, created_by)
        $data = $request->validated();

        // Validation manuelle et sécurisée de la date de début si elle est présente dans la requête
        if ($request->has('agreement_start_date')) {
            $request->validate(['agreement_start_date' => 'date']);
            $data['agreement_start_date'] = $request->input('agreement_start_date');
        }

        // Validation de la date de fin si elle est présente, et contrôle qu'elle est >= à la date de début
        if ($request->has('agreement_end_date')) {
            $request->validate(['agreement_end_date' => 'date|after_or_equal:agreement_start_date']);
            $data['agreement_end_date'] = $request->input('agreement_end_date');
        }

        // Mise à jour du comité avec les données validées
        $committee->update($data);

        // Retourne le comité mis à jour via une ressource propre
        return new CommitteeResource($committee);
    }

    // DELETE /api/Committees/{committee}
    public function destroy(Committee $committee) {
        $committee->delete();

        return response()->json(['message' => 'Committées supprimée avec succès.']);
    }
}


// Avec sécurité pour plus tard!

    // public function update(CommitteeRequest $request, Committee $committee) {

    //     $data = $request->validated();

    //     // Récupère le rôle de l'utilisateur connecté
    //     $userRole = Auth::user()->role_name;

    //     // Si l'utilisateur est autorisé (super_admin ou staff), il peut modifier les dates
    //     if (in_array($userRole, ['super_admin', 'staff'])) {

    //         if ($request->has('agreement_start_date')) {
    //             $request->validate(['agreement_start_date' => 'date']);
    //             $data['agreement_start_date'] = $request->input('agreement_start_date');
    //         }

    //         if ($request->has('agreement_end_date')) {
    //             $request->validate(['agreement_end_date' => 'date|after_or_equal:agreement_start_date']);
    //             $data['agreement_end_date'] = $request->input('agreement_end_date');
    //         }

    //     } else {
    //         // Si un autre rôle essaie de modifier les dates, on les ignore
    //         unset($data['agreement_start_date'], $data['agreement_end_date']);
    //     }

    //     $committee->update($data);
    //     return new CommitteeResource($committee);
    // }

