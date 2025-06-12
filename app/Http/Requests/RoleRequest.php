<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest {
    public function authorize(): bool {

        return true;
    }
    /**
     * Prépare les données avant la validation.
     */
    protected function prepareForValidation(): void {

        if ($this->has('name')) {
            // transforme "Admin" ou "ADMIN" en "admin"
            $this->merge(['name' => Str::lower($this->input('name'))]);
        }
    }

    public function rules(): array {

        $roleId = $this->route('role')?->id;

        return [
            'name' => ['required','string','max:100',
            Rule::unique('roles', 'name')->ignore($roleId)],
        ];
    }

    public function messages(): array {
        
        return [
            'name.required' => 'Le nom du rôle est obligatoire.',
            'name.string'   => 'Le nom doit être une chaîne de caractères.',
            'name.max'      => 'Le nom ne doit pas dépasser 100 caractères.',
            'name.unique'   => 'Ce nom de rôle existe déjà.',
        ];
    }
}
