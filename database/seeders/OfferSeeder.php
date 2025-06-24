<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder {
    public function run(): void {
        
        // Génération de 10 utilisateur aléatoires
        Offer::factory(42)->create();
    }
}
