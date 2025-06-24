<?php

namespace Database\Seeders;

use App\Models\Committee;
use Illuminate\Database\Seeder;

class CommitteeSeeder extends Seeder {
    public function run(): void {
        
        // Génération de 10 utilisateur aléatoires
        Committee::factory(30
        )->create();
    }
}
