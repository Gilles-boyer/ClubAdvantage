<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommitteeOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'committee_id' => 'required|exists:committees,id',
            'offer_id' => 'required|exists:offers,id',
            'assigned_at' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'committee_id.required' => 'Le comité est obligatoire.',
            'committee_id.exists' => 'Ce comité n’existe pas.',

            'offer_id.required' => 'L’offre est obligatoire.',
            'offer_id.exists' => 'Cette offre n’existe pas.',
            
            'assigned_at.date' => 'La date d’assignation doit être une date valide.',
        ];
    }
}
