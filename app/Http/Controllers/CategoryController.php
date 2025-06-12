<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller {
    // GET /api/categories
    public function index() {

        $categories = Category::all();

        return response()->json([
            'message' => 'Liste des catégories récupérée avec succès.',
            'data'    => CategoryResource::collection($categories),
        ], 200);
    }

    // GET /api/categories/{category}
    public function show(Category $category) {

        return response()->json([
            'message' => "Détails de la catégorie « {$category->name} ».",
            'data'    => new CategoryResource($category),
        ], 200);
    }

    // POST /api/categories
    public function store(CategoryRequest $request) {

        $category = Category::create($request->validated());

        return response()->json([
            'message' => "Catégorie « {$category->name} » créée.",
            'data'    => new CategoryResource($category),
        ], 201);
    }

    // PUT /api/categories/{category}
    public function update(CategoryRequest $request, Category $category) {

        $category->update($request->validated());

        return response()->json([
            'message' => "Catégorie « {$category->name} » mise à jour.",
            'data'    => new CategoryResource($category),
        ], 200);
    }

    // DELETE /api/categories/{category}
    public function destroy(Category $category) {
        
        $category->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès.'
        ], 200);
    }
}
