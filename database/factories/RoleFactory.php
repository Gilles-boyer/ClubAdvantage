<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory {

    public function definition(): array {
        return [
            'name' => fake()->unique()->randomElement(array_map(fn ($e) => $e->value, RoleEnum::cases())),
            'description' => fake()->sentence(),
        ];
    }
}
