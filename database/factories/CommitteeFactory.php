<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Committee>
 */
class CommitteeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $agreementStartDate = fake()->dateTimeBetween('0 years', 'now');

        return [
            'name' => fake()->company(),
            'agreement_start_date' => $agreementStartDate,
            'agreement_end_date' => Carbon::createFromDate($agreementStartDate->format('Y'),12,31),
            // 'agreement_end_date' => now()->addYear(), // la date un an plutard
            'auto_renew' => fake()->boolean(70),
            // 'created_by' => User::inRandomOrder()->first()?->id,
            'created_by' => User::whereIn('role_id', [1, 2])->inRandomOrder()->first(), // sélectionne un user(staff[2] ou admin[1]) existant au hasard
        ];
    }
}
