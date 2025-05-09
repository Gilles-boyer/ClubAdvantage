<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    public function toArray($request): array 
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'is_active' => $this->is_active,

            // Clés étrangères (affichées sous forme d'ID)
            'created_by' => $this->created_by,
            'category_id' => $this->category_id,

            // Relations complexes
            'creator_name' => $this->creator?->first_name . ' ' . $this->creator?->last_name,
            'category_name' => $this->category?->name,

            // Dates de création et de modification
            // 'created_at' => $this->created_at->format('Y-m-d'),
            // 'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}