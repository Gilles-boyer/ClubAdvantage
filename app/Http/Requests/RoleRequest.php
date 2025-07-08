<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{

    public function authorize(): bool
    {
        // IDs ou noms des rôles protégés
        $reserved = array_map(fn(RoleEnum $e) => $e->value, RoleEnum::cases());

        // Récupère le rôle en route (pour update/delete)
        $role = $this->route('role');

        // Si c’est une requête PUT/PATCH/DELETE et que le rôle est protégé → refuse
        if (
            $role
            && in_array($role->name, $reserved, true)
            && in_array($this->method(), ['PUT', 'PATCH', 'DELETE'], true)
        ) {
            return false;
        }
        return true;
    }

    protected function failedAuthorization()
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Les 4 rôles principaux ne peuvent pas être modifiés ou supprimés.'
        ], 403));
    }

    /* Prépare les données avant la validation. */
    protected function prepareForValidation(): void
    {
        if ($this->has('name')) {
            // transforme "Admin" ou "ADMIN" en "admin"
            $this->merge(['name' => Str::lower($this->input('name'))]);
        }
    }

    public function rules(): array
    {
        $roleId = $this->route('role')?->id;
        return [
            'name' => [
                'required',
                'string',
                'max:50',
                Rule::unique('roles', 'name')->ignore($roleId)
            ],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom du rôle est obligatoire.',
            'name.string'   => 'Le nom doit être une chaîne de caractères.',
            'name.max'      => 'Le nom ne doit pas dépasser 50 caractères.',
            'name.unique'   => 'Ce nom de rôle existe déjà.',
        ];
    }
}
