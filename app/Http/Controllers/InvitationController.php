<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use App\Mail\InvitationMail;
use App\Models\Role;
use Illuminate\Support\Facades\Mail;

class InvitationController extends Controller
{
    public function store(InvitationRequest $request)
    {
        // 1) Récupère les données validées
        $data = $request->validated();
        $user = $request->user();

        $committee_id   = $user->committee_id;
        $committee_name = $user->committee_name;
        $role_id        = Role::where('name','cse_member')->value('id');
        $role_name      = 'cse_member';

        // 3) Prépare les données pour l'email
        $invitation = [
            'email'           => $data['email'],
            'sender_name'     => $user->first_name.' '.$user->last_name,
            'committee_name'  => $committee_name,
            'role_name'       => $role_name,
            'register_url'    => config('app.front_url')
                                  .'/register'
                                  .'?email='.urlencode($data['email'])
                                  .'&committee='.$committee_id
                                  .'&role='.$role_id,
        ];

        // 4) Envoie l'email d'invitation
        Mail::to($data['email'])->send(new InvitationMail($invitation));

        return response()->json(['message' => 'Invitation envoyée.']);
    }
}
