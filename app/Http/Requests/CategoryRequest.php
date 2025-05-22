<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Je pourrais restreindre par rôle plus tard
    }

    public function rules(): array
    {
        // On récupère l'ID dans l'URL pour éviter l'erreur de doublon lors d'un update
        $categoryId = $this->route('category')?->id;

        return [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active'   => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'      => 'Le nom est obligatoire.',
            'name.string'        => 'Le nom doit être une chaîne de caractères.',
            'name.max'           => 'Le nom ne doit pas dépasser 255 caractères.',
            'name.unique'        => 'Ce nom de catégorie est déjà utilisé.',
            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max'    => 'La description ne doit pas dépasser 1000 caractères.',
            'is_active.boolean'  => 'Le statut actif doit être vrai ou faux.',
        ];
    }
}