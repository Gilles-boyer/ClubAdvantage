<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

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
        static $adminCreated = false;

        // Crée un seul super admin et plusieur role entre 2 et 4 
        $roleId = $adminCreated ? fake()->numberBetween(2, 4) : 1;
        $adminCreated = true;

        // crée aléatoirement des dates sur les deux derniers années
        $createdAt = fake()->dateTimeBetween('-2 years', 'now');

        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'), // réutilise le mdp à chaque fois
            'remember_token' => Str::random(10),
            'terms_accepted_at' => now(),
            'status' => fake()->randomElement(['active','inactive','expired']),
            'role_id' => $roleId,

            // Associe un comiité uniquement aux rôle 3(membre) et 4(CSE)
            'committee_id' => in_array($roleId, [3, 4]) ? \App\Models\Committee::inRandomOrder()->first()?->id : null,
            'created_at' => $createdAt,

            // Met à jour la date de fin de l'année d'inscription 
            'updated_at' => Carbon::createFromDate($createdAt->format('Y'),12,31),
            
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

/**-----------------Des éventuelle ESSAIS----------------
 *  
 * return [
 *  ...
 *  // On va recuperer l'id d'un Role au hasard dans la table roles.
 *  'role_id' => Role::pluck('id')->random(),
 *  'committee_id' => null \App\Models\Committee::inRandomOrder()->first()?->id,
 *  ...
 * ];
*/