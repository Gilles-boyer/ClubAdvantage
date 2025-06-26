<?php

namespace App\Http\Controllers;

use App\Models\Scan;
use App\Http\Requests\ScanRequest;
use App\Http\Resources\ScanResource;

class ScanController extends Controller
{
    // Handles index action (Gère l'action index)
    public function index()
    {
        $scans = Scan::with(['scannedBy', 'scannedUser'])->get();
        return ScanResource::collection($scans);
    }

    // Handles show action (Gère l'action show)
    public function show(Scan $scan)
    {
        $scan->load(['scannedBy', 'scannedUser']);
        return new ScanResource($scan);
    }

    // Handles store action (Gère l'action store)
    public function store(ScanRequest $request)
    {
        $data = $request->validated();
        $scan = Scan::create([
            'user_id'     => $data['user_id'],
            'scanned_by'  => $data['scanned_by'],
            'scanned_at'  => now(), // automatically generated (générée automatiquement)
        ]);
        return response()->json([
            'message' => 'Scan enregistré avec succès.',
            'data'    => new ScanResource($scan),
        ], 201);
    }

    // Handles update action (Gère l'action update)
    public function update(ScanRequest $request, Scan $scan)
    {
        $scan->update($request->validated());
        $scan->load(['scannedBy', 'scannedUser']);

        return response()->json([
            'message' => 'Scan mis à jour avec succès.',
            'data'    => new ScanResource($scan),
        ], 200);
    }

    // Handles destroy action (Gère l'action destroy)
    public function destroy(Scan $scan)
    {
        $scan->delete();
        return response()->json(['message' => 'Scan supprimé avec succès.'], 200);
    }
}
