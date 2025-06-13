<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class ScanRequest extends FormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'user_id'    => 'required|exists:users,id',
            'scanned_by' => 'required|exists:users,id',
            // on ne demande plus scanned_at, il est généré automatiquement
        ];
    }

    public function withValidator($validator) {
        $validator->after(function ($validator) {
            // 👉 L’utilisateur scanné
            $user = User::find($this->user_id);
            if ($user) {
                // 👤 L'utilisateur scanné doit être actif
                if ($user->status !== 'active') {
                    $validator->errors()->add('user_id', 'L’utilisateur est inactif ou expiré.');
                }
                // 👮‍♂️ Le rôle doit être un cse_member ou un cse_admin
                if (!in_array($user->role_name, ['cse_member', 'cse_admin'], true)) {
                    $validator->errors()->add('user_id', 'Seuls les membres du CSE peuvent être scannés.');
                }
                // 🧷 Il doit avoir un comité
                if (!$user->committee_id) {
                    $validator->errors()->add('user_id', 'Cet utilisateur n’est rattaché à aucun comité.');
                }
            }

            // 👉 Le scanneur
            $scanner = User::find($this->scanned_by);
            if ($scanner) {
                // 👤 Le scanneur doit être actif
                if ($scanner->status !== 'active') {
                    $validator->errors()->add('scanned_by', 'Le scanneur est inactif ou expiré.');
                }
                // 👮‍♂️ Le rôle doit être un staff ou un super_admin 
                if (!in_array($scanner->role_name, ['staff', 'super_admin'], true)) {
                    $validator->errors()->add('scanned_by', 'Seuls les membres du staff ou super_admin peuvent scanner.');
                }
            }
        });
    }

    public function messages(): array {
        return [
            // user_id
            'user_id.required'    => "L'utilisateur à scanner est obligatoire.",
            'user_id.exists'      => "L'utilisateur à scanner n'existe pas.",

            // scanned_by
            'scanned_by.required' => "L'identifiant du scanneur est obligatoire.",
            'scanned_by.exists'   => "L'utilisateur qui scanne n'existe pas.",
        ];
    }
}
