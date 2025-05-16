<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UserFactory extends Factory {

    protected static ?string $password;

    public function definition(): array {
        static $adminCreated = false;

        // Crée un seul super admin et plusieur role entre 2 et 4 
        $roleName = $adminCreated ? 'super_admin' : fake()->randomElement(['staff', 'cse_admin', 'cse_member']);
        $adminCreated = true;

        // crée aléatoirement des dates sur les deux derniers années
        $createdAt = fake()->dateTimeBetween('-2 years', 'now');

        return [
            'first_name'        => fake()->firstName(),
            'last_name'         => fake()->lastName(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => static::$password ??= Hash::make('password'), // réutilise le mdp à chaque fois
            'remember_token'    => Str::random(10),
            'terms_accepted_at' => now(),
            'status'            => fake()->randomElement(['active','inactive','expired']),
            'role_name'           => $roleName,

            // Associe un comité uniquement aux rôle 3(membre) et 4(CSE)
            'committee_id' => in_array($roleName, ['cse_admin', 'cse_member']) ? \App\Models\Committee::inRandomOrder()->first()?->id : null,
            'created_at'   => $createdAt,

            // Met à jour la date de fin de l'année d'inscription 
            'updated_at'   => Carbon::createFromDate($createdAt->format('Y'),12,31),
            
        ];
    }
    
    public function unverified(): static {
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
