<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory {

    public function definition(): array {
        return [
            'name' => fake()->unique()->randomElement(['super_admin', 'staff', 'cse_admin', 'cse_member']),
            'description' => fake()->sentence(),
        ];
    }
}
