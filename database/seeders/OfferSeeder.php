<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder {

    public function run(): void {
        // Génération de 10 utilisateur aléatoires
        Offer::factory(10)->create();
    }
}
