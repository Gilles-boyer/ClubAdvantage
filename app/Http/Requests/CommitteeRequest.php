<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommitteeRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name'                 => 'required|string|max:255',
            'agreement_start_date' => 'nullable|date',
            'agreement_end_date'   => 'nullable|date|after_or_equal:agreement_start_date',
            'auto_renew'           => 'boolean',
            'created_by'           => 'nullable|exists:users,id',
        ];
    }

    public function messages(): array {
        return [
            'name.required'                     => 'Le nom du comité est obligatoire.',
            'agreement_end_date.after_or_equal' => 'La date de fin doit être postérieure ou égale à la date de début.',
        ];
    }
}
