<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Laravel va remplir les roles avant de remplir les utilisateurs (Sinon problème de role_id)
            RoleSeeder::class,
            CategorySeeder::class,
            UserSeeder::class,
        ]);
    }
}
