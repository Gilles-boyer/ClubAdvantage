<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use App\Enums\RoleEnum;

class InvitationController extends Controller
{
    public function store(InvitationRequest $request)
    {
        // 1) Récupère les données validées
        $data = $request->validated();
        $user = $request->user();

        $committee_id   = $user->committee_id;
        $committee_name = $user->committee_name;
        $roleEnum      = RoleEnum::CSE_MEMBER;

        // 3) Prépare les données pour l'email
        $invitation = [
            'email'           => $data['email'],
            'sender_name'     => $user->first_name . ' ' . $user->last_name,
            'committee_name'  => $committee_name,
            'role_name'       => $roleEnum->value,
            'register_url'    => config('app.front_url')
                . '/register'
                . '?email=' . urlencode($data['email'])
                . '&committee=' . $committee_id
                . '&role=' . $roleEnum->value,
        ];

        // 4) Envoie l'email d'invitation
        Mail::to($data['email'])->send(new InvitationMail($invitation));

        return response()->json(['message' => 'Invitation envoyée.']);
    }
}
