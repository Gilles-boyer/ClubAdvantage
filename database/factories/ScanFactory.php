<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Scan>
 */
class ScanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Date du scan : une date dans les 6 derniers mois
            'scanned_at' => fake()->dateTimeBetween('-6 months', 'now'),
            
            // Celui qui scanne : un membre du staff
            'scanned_by' => User::where('role_id', [1, 2])->inRandomOrder()->first(),
            
            // Celui qui est scanné : un membre CSE
            'user_id' => User::where('role_id', [3, 4])->inRandomOrder()->first(),
        ];
    }
}
