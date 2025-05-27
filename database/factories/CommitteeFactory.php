<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class CommitteeFactory extends Factory {
    
    public function definition(): array {

        $agreementStartDate = fake()->dateTimeBetween('0 years', 'now');

        return [
            'name' => fake()->company(),
            'agreement_start_date' => $agreementStartDate,
            'agreement_end_date' => Carbon::createFromDate($agreementStartDate->format('Y'),12,31),
            'auto_renew' => fake()->boolean(70),

            // Sélectionne un user(staff[2] ou admin[1]) existant au hasard
            'created_by' => User::whereIn('role_name', ['super_admin','staff'])->inRandomOrder()->first(), 
        ];
    }
}

/**-----------------Des éventuelle ESSAIS----------------
 *  
 * return [
 *  ...
 * 'agreement_end_date' => now()->addYear(), // la date un an plutard
 * 'created_by' => User::inRandomOrder()->first()?->id,
 *  ...
 * ];
*/
