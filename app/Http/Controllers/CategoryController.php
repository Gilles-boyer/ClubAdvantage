<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    // GET /api/categories/{category}
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    // POST /api/categories
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return new CategoryResource($category);
    }

    // PUT /api/categories/{category}
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return new CategoryResource($category);
    }

    // DELETE /api/categories/{category}
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès.']);
    }
}