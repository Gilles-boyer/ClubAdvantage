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
        return new ScanResource(Scan::create($request->validated()));
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

    // Vérification (utilisateur, rôle, statut, comité) puis enregistre
    public function validateStore(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'scanned_by' => 'required|integer|exists:users,id',
        ]);

        $user = User::where('id', $data['user_id'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur introuvable.'
            ], 404);
        }

        // 🔒 Vérification : utilisateur actif
        if ($user->status !== 'active') {
            return response()->json([
                'message' => 'Utilisateur inactif ou expiré.'
            ], 403);
        }

        // 🔒 Vérification : rôle = cse_member
        if ($user->role_name !== 'cse_member') {
            return response()->json([
                'message' => 'Seuls les membres CSE peuvent être scannés.'
            ], 403);
        }

        // 🔒 Vérification : comité attribué
        if (!$user->committee_id) {
            return response()->json([
                'message' => 'Aucun comité attribué à cet utilisateur.'
            ], 403);
        }

        // ✅ Création du scan
        $scan = Scan::create([
            'user_id' => $user->id,
            'scanned_by' => $data['scanned_by'],
            'scanned_at' => now(),
        ]);

        return response()->json([
            'message' => 'Scan validé et enregistré avec succès.',
            'data' => new ScanResource($scan),
        ]);
    }
}
