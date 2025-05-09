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

            // Relations complexes (si la relation est chargée)

            // Nom complet du créateur
            'creator_name' => $this->creator?->first_name . ' ' . $this->creator?->last_name,

            // Nom de la catégorie
            'category_name' => $this->category?->name,

            // Liste des comités liés à cette offre
            'committees' => $this->whenLoaded('committees', function() {
                return $this->committees->map(function ($committee) {
                    return [
                        'id' => $committee->id,
                        'name' => $committee->name,
                        'assigned_at' => $committee->pivot->assigned_at,
                    ];
                });  
            }),

            // Dates de création et de modification
            // 'created_at' => $this->created_at->format('Y-m-d'),
            // 'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}