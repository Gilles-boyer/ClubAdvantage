<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommitteeOfferResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'committee_id' => $this->committee_id,
            'offer_id'     => $this->offer_id,
            'assigned_at'  => $this->assigned_at?->format('Y-m-d H:i'),
        ];
    }
}
