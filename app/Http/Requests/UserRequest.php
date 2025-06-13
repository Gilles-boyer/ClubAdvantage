<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Role;
use App\Models\User;

class UserRequest extends FormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $userId = $this->route('user')?->id;

        return [
            'first_name'    => ['required', 'string', 'max:255'],
            'last_name'     => ['required', 'string', 'max:255'],

            'status'        => ['required', Rule::in(['active', 'inactive', 'expired'])],

            // Email obligatoire en POST, facultatif en PUT, mais toujours vérifié s’il est présent
            'email'         => $this->isMethod('post') 
            ? ['required', 'email', Rule::unique('users', 'email')]
            : ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],

            // Password obligatoire en POST, facultatif en PUT/PATCH
            'password'      => $this->isMethod('post') 
            ? ['required','string','min:6']
            : ['nullable','string','min:6'],

            'role_id'       => ['required', 'integer', Rule::exists('roles', 'id')],
            'committee_id'  => ['nullable', 'integer', Rule::exists('committees', 'id')],
        ];
    }
    public function withValidator($validator) {
        $validator->after(function($validator) {
            $userId         = $this->route('user')?->id;
            $superAdminRole = Role::where('name','super_admin')->first();
            $staffRole      = Role::where('name','staff')->first();

            // ─── 1. Un seul super_admin autorisé ───
            if ($superAdminRole
                && $this->filled('role_id')
                && $this->role_id == $superAdminRole->id
            ) {
                $exists = User::where('role_id',$superAdminRole->id)
                              ->when($userId, fn($q) => $q->where('id','!=',$userId))
                              ->exists();
                if ($exists) {
                    $validator->errors()->add(
                        'role_id',
                        'Il y a déjà un super-admin. Vous ne pouvez pas en attribuer un second.'
                    );
                }
            }

            // ─── 2. Un staff reste staff (sur update) ───
            if ($userId && $staffRole) {
                $original = User::find($userId);
                if ($original?->role_id === $staffRole->id
                    && $this->filled('role_id')
                    && $this->role_id != $staffRole->id
                ) {
                    $validator->errors()->add(
                        'role_id',
                        'Le rôle staff ne peut pas être modifié.'
                    );
                }
            }
        });
    }

    public function messages(): array {
        return [
            'first_name.required'  => 'Le prénom est obligatoire.',
            'last_name.required'   => 'Le nom est obligatoire.',
            'status.required'      => 'Le statut est obligatoire.',
            'status.in'            => 'Le statut est invalide.',
            'email.required'       => "L'adresse email est obligatoire.",
            'email.email'          => "L'adresse email est invalide.",
            'email.unique'         => "Cet email est déjà pris.",
            'password.required'    => 'Le mot de passe est obligatoire.',
            'password.min'         => 'Le mot de passe doit contenir au moins 6 caractères.',
            'role_id.required'     => "Un rôle doit être sélectionné.",
            'role_id.exists'       => "Le rôle sélectionné est invalide.",
            'committee_id.exists'  => "Le comité sélectionné est invalide.",
        ];
    }

    // Ajoute les champs absents lors des PUT pour éviter les suppressions accidentelles.
    public function validated($key = null, $default = null) {
        $data = parent::validated();

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // Conserve l’email actuel si non renvoyé
            if (!$this->has('email') && $this->route('user')) {
                 $data['email'] = $this->route('user')->email;
            }

            // Supprime password s’il est vide → évite un password = null
            if (!$this->filled('password')) {
                 unset($data['password']);
            }
        }
        return $data;
    }
}
