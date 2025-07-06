<?php

namespace Database\Factories;

use App\Models\{Committee, Offer, CommitteeOffer};
use Illuminate\Database\Eloquent\Factories\Factory;

class CommitteeOfferFactory extends Factory
{
    protected $model = CommitteeOffer::class;

    public function definition(): array
    {
        return [
            'committee_id' => fn () => Committee::factory()->create()->id,
            'offer_id'     => fn () => Offer::factory()->create()->id,
            'assigned_at'  => now(),
        ];
    }
}
