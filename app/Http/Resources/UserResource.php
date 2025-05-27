<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'    => $this->id,
            'email' => $this->email,
        
            // Infos du nom & prénom (séparés et combinés)
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'full_name'  => trim($this->first_name . ' ' . $this->last_name),
        
            // Rôle
            'role_id'    => $this->role_id ?? null,
            'role_name'  => $this->role_name ?? null,

            // Comité
            'committee_id'=> $this->committee_id ?? null,
            'committee'   => $this->committee->name ?? null,

            'status'      => $this->status,
        
            // Relations supplémentaires
            'committees_created' => CommitteeResource::collection($this->whenLoaded('createdCommittees')),  // Comités créés si user = staff
            'committee_members'  => UserResource::collection($this->whenLoaded('committeeMembers')),        // Membres du comité si user = CSE
        
            // Dates si besoin
            // 'created_at' => $this->created_at->format('Y-m-d'),
            // 'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}

// whenLoaded()-> évite les erreurs si la relation n'est pas chargée (with(...))
// Committees::collection -> formate joliment les comité créés
//  UserResource::collection -> + permet d'afficher les membres du comité si user = CSE
