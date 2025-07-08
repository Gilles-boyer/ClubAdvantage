<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory {

    public function definition(): array {
        return [
            'name' => fake()->unique()->randomElement([
                'Pilotage', 
                'Réduction boutique', 
                'Stage auto', 
                'Expérience VIP', 
                'Location salle',
            ]),
            'description' => fake()->sentence(), //description aléatoire
            'is_active' => fake()->boolean(90), // 90 % de vrais
        ];
    }
}
