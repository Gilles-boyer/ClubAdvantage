<?php

namespace Database\Factories;

use App\Models\Committee;
use App\Models\Offer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommitteeOffer>
 */
class CommitteeOfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'committee_id' => Committee::inRandomOrder()->first()?->id(),
            'offer_id' => Offer::inRandomOrder()->first()?->id(),
            'assigned_at' => Carbon::now(),
        ];
    }
}
