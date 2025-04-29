<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Création d'un utilisateur test
        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test.user@example.com',
        ]);

        // Génération de 10 utilisateur aléatoires
        User::factory(10)->create();
    }
}
