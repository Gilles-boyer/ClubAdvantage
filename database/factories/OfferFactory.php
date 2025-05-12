<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory {

    public function definition(): array {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'is_active' => fake()->boolean(),
            'created_by' => Category::inRandomOrder()->first(), 
            'category_id' => \App\Models\Category::inRandomOrder()->first()?->id,
        ];
    }
}

//User::whereIn('role_id', [1,2])->inRandomOrder()->first(),
