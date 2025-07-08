<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    // TODO GET /api/categories (GET /api/categories)
    // Handles index action (Gère l'action index)
    public function index()
    {

        $categories = Category::all();

        return response()->json([
            'message' => 'Liste des catégories récupérée avec succès.',
            'data'    => CategoryResource::collection($categories),
        ], 200);
    }

    // TODO GET /api/categories/{category} (GET /api/categories/{category})
    // Handles show action (Gère l'action show)
    public function show(Category $category)
    {

        return response()->json([
            'message' => "Détails de la catégorie « {$category->name} ».",
            'data'    => new CategoryResource($category),
        ], 200);
    }

    // TODO POST /api/categories (POST /api/categories)
    // Handles store action (Gère l'action store)
    public function store(CategoryRequest $request)
    {

        $category = Category::create($request->validated());

        return response()->json([
            'message' => "Catégorie « {$category->name} » créée.",
            'data'    => new CategoryResource($category),
        ], 201);
    }

    // TODO PUT /api/categories/{category} (PUT /api/categories/{category})
    // Handles update action (Gère l'action update)
    public function update(CategoryRequest $request, Category $category)
    {

        $category->update($request->validated());

        return response()->json([
            'message' => "Catégorie « {$category->name} » mise à jour.",
            'data'    => new CategoryResource($category),
        ], 200);
    }

    // TODO DELETE /api/categories/{category} (DELETE /api/categories/{category})
    // Handles destroy action (Gère l'action destroy)
    public function destroy(Category $category)
    {

        $category->delete();

        return response()->json([
            'message' => "Catégorie « {$category->name} » supprimée avec succès."
        ], 200);
    }
}
