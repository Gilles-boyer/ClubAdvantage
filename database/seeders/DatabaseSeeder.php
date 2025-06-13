<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        
        $this->call([
            // Laravel va remplir les roles avant de remplir les utilisateurs (Sinon problème de role_id)
            RoleSeeder::class,
            CommitteeSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            OfferSeeder::class,
            ScanSeeder::class,
            CommitteeOfferSeeder::class,
        ]);
    }
}
