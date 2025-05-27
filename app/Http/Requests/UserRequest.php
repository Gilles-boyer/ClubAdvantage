<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $userId = $this->route('user')?->id;

        return [
            // 'full_name'    => 'required|string|max:255',
            'first_name'   => 'required', 'string', 'max:255',
            'last_name'    => 'required', 'string', 'max:255',

            // Email obligatoire en POST, facultatif en PUT, mais toujours vérifié s’il est présent
            'email'        => $this->isMethod('post') ? 
            ['required', 'email', Rule::unique('users', 'email')->ignore($userId)] : 
            ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],

            // Password obligatoire en POST, facultatif en PUT/PATCH
            'password'     => $this->isMethod('post') ? 'required|string|min:6' : 'nullable|string|min:6',

            'role_name'    => 'required', Rule::exists('roles', 'name'),
            'committee_id' => 'nullable', Rule::exists('committees', 'id'),
        ];
    }

    public function messages(): array {
        return [
            'email.required'      => 'L’adresse email est obligatoire.',
            'email.email'         => 'L’adresse email est invalide.',
            'email.unique'        => 'Cet email est déjà pris.',

            'password.min'        => 'Le mot de passe doit contenir au moins 6 caractères.',

            'first_name.required' => 'Le prénom est obligatoire.',
            'last_name.required'  => 'Le nom est obligatoire.',

            'role_name.required'  => 'Un rôle doit être sélectionné.',
            'role_name.exists'    => 'Le rôle sélectionné est invalide.',

            'committee_id.exists' => 'Le comité sélectionné est invalide.',
        ];
    }

    // Ajoute les champs absents lors des PUT pour éviter les suppressions accidentelles.
    public function validated($key = null, $default = null) {
        $data = parent::validated();

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // Conserve l’email actuel si non renvoyé
            if (!$this->has('email') && $this->route('user')) { $data['email'] = $this->route('user')->email;}

            // Supprime password s’il est vide → évite un password = null
            if (!$this->filled('password')) { unset($data['password']);}
        }
        return $data;
    }
}
