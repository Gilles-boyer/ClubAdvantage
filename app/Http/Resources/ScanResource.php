<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScanResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'         => $this->id,
            'scanned_at' => $this->scanned_at,
            'scanned_by' => $this->scanned_by,
            'user_id'    => $this->user_id,

            'scanned_by_name'   => $this->scannedBy?->first_name . ' ' . $this->scannedBy?->last_name,
            'scanned_user_name' => $this->scannedUser?->first_name . ' ' . $this->scannedUser?->last_name,

            // Dates de création et de modification
            // 'created_at' => $this->created_at->format('Y-m-d'),
            // 'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}