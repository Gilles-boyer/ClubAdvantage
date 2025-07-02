<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;

class InvitationRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->hasRole(RoleEnum::SUPER_ADMIN)
            || $this->user()->hasRole(RoleEnum::STAFF)
            || $this->user()->hasRole(RoleEnum::CSE_ADMIN);
    }

    public function rules()
    {
        return [
            'email'          => ['required','email','max:255'],
        ];
    }
}
