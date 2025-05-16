<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'full_name'    => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email,' . $userId,
            'password'     => $this->isMethod('post') ? 'required|string|min:6' : 'nullable|string|min:6',
            'role_name'    => 'required|exists:roles,name',
            'committee_id' => 'nullable|exists:committees,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'       => 'Le nom du rôle est obligatoire.',
            'name.string'         => 'Le nom doit être une chaîne de caractères.',

            'email.required'      => 'L’adresse email est obligatoire.',
            'email.email'         => 'L’email fourni est invalide.',
            'email.unique'        => 'Cet email est déjà pris.',

            'password.min'        => 'Le mot de passe doit contenir au moins 6 caractères.',

            'role_name.required'    => 'Un rôle doit être sélectionné.',
            'role_name.exists'      => 'Le rôle sélectionné n’existe pas.',

            'committee_id.exists' => 'Le comité sélectionné est invalide.',
        ];
    }
}

// use Illuminate\Validation\Rule;

// 'email' => [
//     'required',
//     'email',
//     Rule::unique('users')->ignore($userId),
// ],