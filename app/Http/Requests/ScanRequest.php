<?php

namespace App\Http\Requests;

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
            'scanned_at' => 'required|date',
            'scanned_by' => 'nullable|exists:users,id',
            'user_id' => 'nullable|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'scanned_at.required' => 'La date de scan est obligatoire.',
            'scanned_at.date' => 'La date de scan doit être une date valide.',
            'scanned_by.exists' => 'Le scanneur spécifié n’existe pas.',
            'user_id.exists' => 'L’utilisateur scanné spécifié n’existe pas.',
        ];
    }
}