<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            // Les deux noms sont ajouté ensemble
            'name' => trim($this->first_name . ' ' . $this->last_name),
            'email' => $this->email,
            'role' => $this->role->name ?? null,
            'committee' => $this->committee->name ?? null,
            // 'created_at' => $this->created_at->format('Y-m-d'),
            // 'updated_at' => $this->updated_at->format('Y-m-d'),
        ];
    }
}