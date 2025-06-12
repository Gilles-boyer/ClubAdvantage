<?php

namespace Database\Seeders;

use App\Models\CommitteeOffer;
use App\Models\Committee;
use App\Models\Offer;
use Illuminate\Database\Seeder;

class CommitteeOfferSeeder extends Seeder {
  public function run(): void {

        $committees = Committee::all();
        $offers = Offer::all();

        foreach ($committees as $committee) {
            
            // On sélectionne 3 offres aléatoires parmi toutes
            $randomOffers = $offers->random(min(3, $offers->count()));

            foreach ($randomOffers as $offer) {
                // On crée l'association seulement si elle n'existe pas
                CommitteeOffer::firstOrCreate([
                    'committee_id' => $committee->id,
                    'offer_id' => $offer->id,
                ]);
            }
        }
    }
}
