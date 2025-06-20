<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommitteeResource extends JsonResource {
    public function toArray($request): array {

        return [
            'id'                     => $this->id,
            'name'                   => $this->name,
            
            'agreement_start_date' => $this->agreement_start_date?->toDateString(),
            'agreement_end_date'   => $this->agreement_end_date?->toDateString(),

            'auto_renew'             => (bool) $this->auto_renew,
            'is_active'              => (bool) $this->is_active,
            'created_by'             => $this->created_by,
        ];
    }
}

// 'created_at'          => $this->created_at?->format('Y-m-d'),
// 'updated_at'          => $this->updated_at?->format('Y-m-d'),
