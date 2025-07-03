<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use App\Models\Committee;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        static $adminCreated = false;

        // Crée un seul super admin puis des rôles entre staff, cse_admin et cse_member
        $roleEnum  = $adminCreated
            ? fake()->randomElement([RoleEnum::STAFF, RoleEnum::CSE_ADMIN, RoleEnum::CSE_MEMBER])
            : RoleEnum::SUPER_ADMIN;
        $adminCreated = true;

        // 🔁 On récupère l'objet Role correspondant
        $role = Role::where('name', $roleEnum->value)->first();

        // Dates de création et de mise à jour
        $createdAt = fake()->dateTimeBetween('-2 years', 'now');

        return [
            'first_name'        => fake()->firstName(),
            'last_name'         => fake()->lastName(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => bcrypt('password12345'),
            'remember_token'    => Str::random(10),
            'terms_accepted_at' => now(),
            'status'            => 'active',
            'role_name'         => $roleEnum,
            'role_id'           => $role?->id,

            // Associe un comité uniquement aux rôle (membre[4]) et (CSE[3])
            'committee_id'=> in_array($roleEnum, [RoleEnum::CSE_ADMIN, RoleEnum::CSE_MEMBER], true)
                             ? Committee::inRandomOrder()->value('id')
                             : null,

            'created_at'   => $createdAt,

            // Met à jour la date de fin de l'année d'inscription 
            'updated_at'   => Carbon::createFromDate($createdAt->format('Y'), 12, 31),

        ];
    }
    public function forCse(): static
    {
        return $this->state(fn(array $attrs) => [
            'committee_id' => Committee::inRandomOrder()->value('id'),
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
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
