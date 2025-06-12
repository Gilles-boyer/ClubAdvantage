<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OfferRequest extends FormRequest {
    public function authorize(): bool {

        return true; // Mettre false si on veux restreindre l'accès
    }

    // Règles de validation pour créer ou mettre à jour une offre
    public function rules(): array {

        return [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active'   => 'required|boolean',
            'created_by'  => ['nullable','integer',Rule::exists('users','id')],
            'category_id' => ['nullable','integer',Rule::exists('categories','id')],
        ];
    }

    public function messages(): array {
        
        return [
            'title.required'     => 'Le titre de l’offre est obligatoire.',
            'title.string'       => 'Le titre doit être une chaîne de caractères.',
            'title.max'          => 'Le titre ne doit pas dépasser 255 caractères.',

            'description.string' => 'La description doit être une chaîne de caractères.',

            'is_active.required' => 'Le champ "actif" est obligatoire.',
            'is_active.boolean'  => 'Le champ "actif" doit être de type booléen.',

            'created_by.exists'  => 'L’utilisateur spécifié n’existe pas.',
            'category_id.exists' => 'La catégorie spécifiée n’existe pas.',
        ];
    }
}
