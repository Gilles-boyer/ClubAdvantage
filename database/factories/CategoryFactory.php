<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Pilotage', 
                'Réduction boutique', 
                'Stage auto', 
                'Expérience VIP', 
                'Location salle',
            ]),
            'description' => fake()->sentence(),
            'is_active' => fake()->boolean(90) ? 'active' : 'inactive', // 90% de chance que ce soit active grace a boolean(90)
        ];
    }
}
