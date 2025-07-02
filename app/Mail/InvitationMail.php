<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $invitation;

    public function __construct(array $invitation)
    {
        $this->invitation = $invitation;
    }

    public function build()
    {
        return $this
            ->subject('Vous êtes invité·e à rejoindre ClubAdvantage')
            ->view('emails.invitation')
            ->with('invitation', $this->invitation);
    }
}
