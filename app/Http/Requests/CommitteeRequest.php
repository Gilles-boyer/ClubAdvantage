<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommitteeRequest extends FormRequest {
    public function authorize(): bool {

        return true;
    }

    public function rules(): array {

        // Récupère l'ID du comité en URL, ou null en création
        $committeeId = $this->route('committee')?->id;

        return [
            // unique sur la table committees, colonne name, ignore l'enregistrement en cours
            'name' => [
                'required','string','max:255',
                Rule::unique('committees', 'name')->ignore($committeeId),
            ],

            'auto_renew'   => ['required', 'boolean'],
            'created_by'   => ['nullable', 'exists:users,id'],
            
            'agreement_start_date'=> ['nullable','date'],
            'agreement_end_date'  => ['nullable','date','after_or_equal:agreement_start_date'],
        ];
    }

    public function messages(): array {
        
        return [
            'name.required'       => 'Le nom du comité est obligatoire.',
            'name.unique'         => 'Un comité porte déjà ce nom.',
            'auto_renew.required' => 'Le champ auto_renew est obligatoire.',
            'auto_renew.boolean'  => 'Le champ auto_renew doit être vrai ou faux.',
            'created_by.exists'   => 'L’utilisateur ayant créé le comité est introuvable.',
            'agreement_end_date.after_or_equal' => 'La date de fin doit être postérieure ou égale à la date de début.'
        ];
    }
}
