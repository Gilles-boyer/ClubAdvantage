<?php

namespace App\Http\Controllers;

use App\Models\Scan;
use App\Http\Requests\ScanRequest;
use App\Http\Resources\ScanResource;
use App\Models\User;
use Illuminate\Http\Request;

class ScanController extends Controller
{
    // Liste tous les scans.
    public function index() {
        $scans = Scan::with(['scannedBy', 'scannedUser'])->get();
        return ScanResource::collection($scans);
    }

    // Affiche un scan en détail.
    public function show(Scan $scan) {
        $scan->load(['scannedBy', 'scannedUser']);
        return new ScanResource($scan);
    }

    // Crée un nouveau scan.
    public function store(ScanRequest $request) {
        $data = $request->validated();

        $scan = Scan::create([
            'user_id'     => $data['user_id'],
            'scanned_by'  => $data['scanned_by'],
            'scanned_at'  => now(), // générée automatiquement
        ]);

        return new ScanResource($scan);
    }


    //  Met à jour un scan existant.
    public function update(ScanRequest $request, Scan $scan) {
        $scan->update($request->validated());

        return new ScanResource($scan);
    }

    // Supprime un scan (soft delete).
    public function destroy(Scan $scan) {
        $scan->delete();

        return response()->json(['message' => 'Scan supprimé avec succès.']);
    }


}
