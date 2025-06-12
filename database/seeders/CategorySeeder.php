<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder {
    public function run(): void {

        //les noms de category sont fix, les description et is_active aléatoire  
        $names = [
            'Pilotage', 
            'Réduction boutique', 
            'Stage auto',
            'Expérience VIP',
            'Location salle',
        ];

        // $names est un tableau de plusieurs noms et foreach parcoure chaque nom et l'enregistre individuellement
        Foreach ($names as $name) {
            Category::create([
                'name'        => $name,
                'description' => fake()->sentence(),
                // Le % du Seeder Prend le dessus sur celui de Factory
                'is_active'   => fake()->boolean(90),
            ]);
        }
    }

}

        // Génération de 5 category aléatoires
        // Category::factory()->count(5)->create();
