<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Foundation\Http\FormRequest;

class ScanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'qr_token'   => ['required', 'string'],
            'scanned_by' => ['required', 'exists:users,id'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            /* ---------------- Déchiffrage du QR ---------------- */
            try {
                $userId = Crypt::decryptString($this->qr_token);
            } catch (DecryptException) {
                $validator->errors()->add('qr_token', 'QR-Code invalide ou corrompu.');
                return;
            }

            // On "injecte" l’ID dans l’instance pour la suite
            $this->merge(['user_id' => $userId]);

            // 👉 L’utilisateur scanné
            $user = User::find($userId);
            if ($user) {
                // 👤 L'utilisateur scanné doit être actif
                if ($user->status !== 'active') {
                    $validator->errors()->add('user_id', 'L’utilisateur est inactif ou expiré.');
                }
                // 👮‍♂️ Le rôle doit être un cse_member ou un cse_admin
                if (!in_array($user->role->name, [RoleEnum::CSE_MEMBER->value, RoleEnum::CSE_ADMIN->value], true)) {
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
                if (!in_array($scanner->role->name, [RoleEnum::STAFF->value, RoleEnum::SUPER_ADMIN->value], true)) {
                    $validator->errors()->add('scanned_by', 'Seuls les membres du staff ou super_admin peuvent scanner.');
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'qr_token.required' => 'Le QR-Code est obligatoire.',

            'scanned_by.required' => "L'identifiant du scanneur est obligatoire.",
            'scanned_by.exists'   => "L'utilisateur qui scanne n'existe pas.",
        ];
    }
}
