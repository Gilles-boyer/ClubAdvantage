<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class ScanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'    => 'required|exists:users,id',
            'scanned_by' => 'required|exists:users,id',
            // on ne demande plus scanned_at, il est généré automatiquement
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $user = User::find($this->user_id);

            if (!$user) return;

            // 👤 L'utilisateur scanné doit être actif
            if ($user->status !== 'active') {
                $validator->errors()->add('user_id', 'L’utilisateur est inactif ou expiré.');
            }

            // 👮‍♂️ Le rôle doit être membre CSE
            if (!in_array($user->role_name, ['cse_member', 'cse_admin'])) {
                $validator->errors()->add('user_id', 'Seuls les membres du CSE peuvent être scannés.');
            }

            // 🧷 Il doit avoir un comité
            if (!$user->committee_id) {
                $validator->errors()->add('user_id', 'Cet utilisateur n’est rattaché à aucun comité.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'user_id.required'    => "L'utilisateur à scanner est obligatoire.",
            'user_id.exists'      => "L'utilisateur à scanner n'existe pas.",
            'scanned_by.required' => "L'identifiant du scanneur est obligatoire.",
            'scanned_by.exists'   => "L'utilisateur qui scanne n'existe pas.",
        ];
    }
}
