<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use App\Http\Requests\CommitteeRequest;
use App\Http\Resources\CommitteeResource;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class CommitteeController extends Controller
{
    /* GET /api/committees */
    // Handles index action (Gère l'action index)
    public function index(): JsonResponse
    {

        $committees = Committee::all();

        return response()->json([
            'message' => 'Liste des comités récupérée avec succès.',
            'data'    => CommitteeResource::collection($committees),
        ], 200);
    }

    /* GET /api/committees/{committee} */
    // Handles show action (Gère l'action show)
    public function show(Committee $committee): JsonResponse
    {

        return response()->json([
            'message' => 'Comité récupéré avec succès.',
            'data'    => new CommitteeResource($committee),
        ], 200);
    }

    /* POST /api/committees */
    // Handles store action (Gère l'action store)
    public function store(CommitteeRequest $request): JsonResponse
    {

        $data = $request->validated();

        // Défauts : début = now(), fin = fin d’année
        $data['agreement_start_date'] ??= now()->toDateString();;
        $data['agreement_end_date']   ??= Carbon::parse($data['agreement_start_date'])->endOfYear()->toDateString();

        $committee = Committee::create($data);

        return response()->json([
            'message' => 'Comité créé avec succès.',
            'data'    => new CommitteeResource($committee),
        ], 201);
    }

    /* PUT/PATCH /api/committees/{committee} */
    // Handles update action (Gère l'action update)
    public function update(CommitteeRequest $request, Committee $committee): JsonResponse
    {

        $committee->update($request->validated());

        return response()->json([
            'message' => 'Comité mis à jour avec succès.',
            'data'    => new CommitteeResource($committee->fresh()),
        ], 200);
    }

    /* DELETE /api/committees/{committee} */
    // Handles destroy action (Gère l'action destroy)
    public function destroy(Committee $committee): JsonResponse
    {

        $committee->delete();

        return response()->json([
            'message' => 'Comité supprimé avec succès.',
        ], 200);
    }
}

// TODO : JsonResponse indique que cette méthode renvoie toujours une réponse JSON (: JsonResponse indique que cette méthode renvoie toujours une réponse JSON)
// (instance de Illuminate\Http\JsonResponse) — cela améliore la lisibilité, 
// TODO permet à l’IDE de proposer la complétion adéquate et aide les outils d’analyse statique (permet à l’IDE de proposer la complétion adéquate et aide les outils d’analyse statique)
// TODO à vérifier que l’on renvoie bien un JSON. (à vérifier que l’on renvoie bien un JSON.)
