<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'), // réutilise le mdp à chaque fois
            'remember_token' => Str::random(10),
            'terms_accepted_at' => now(),
            'status' => fake()->randomElement(['active','inactive','expired']),
            'role_id' => 1,       // à adapter selon les seeder
            'committee_id' => null

            // On va recuperer l'id d'un Role au hasard dans la table roles.
            // 'role_id' => Role::pluck('id')->random(),
            // 'committee_id' => null \App\Models\Committee::inRandomOrder()->first()?->id,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
