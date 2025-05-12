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

    public function store(CommitteeRequest $request) {
        $committee = Committee::create($request->validated());
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
