<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Committee>
 */
class CommittteeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $agreementStartDate = fake()->now();

        return [
            'name' => fake()->company(),
            'agreement_start_date' => $agreementStartDate,
            'agreement_end_date' => Carbon::createFromDate($agreementStartDate->format('Y'),12,31),
            // 'agreement_end_date' => now()->addYear(), // la date un an plutard
            'auto_renew' => fake()->boolean(70),
            'created_by' => User::inRandomOrder()->first(), // sélectionne un user existant au hasard
        ];
    }
}
