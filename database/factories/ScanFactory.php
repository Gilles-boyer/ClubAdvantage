<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScanFactory extends Factory {

    public function definition(): array {
        return [
            // Date du scan : une date dans les 6 derniers mois
            'scanned_at' => fake()->dateTimeBetween('-6 months', 'now'),
            
            // Celui qui scanne : un membre du staff
            'scanned_by' => User::whereIn('role_name', ['super_admin', 'staff'])
                   ->inRandomOrder()
                   ->first(),
            
            // Celui qui est scanné : un membre CSE
            'user_id' => User::whereIn('role_name', ['cse_member', 'cse_admin'])
                 ->inRandomOrder()
                 ->first(),
        ];
    }
}

/**-----------------Des éventuelle ESSAIS----------------
 *  
 * return [
 *  ...
 * // // Celui qui scanne : un membre du staff
 * 'scanned_by' => User::all()->where('role_id', 2)->random()->first(),
            
 * // // Celui qui est scanné : un membre CSE
 * 'user_id' => User::where('role_id', 3)->orWhere('role_id', 4)->first(),
 *  ...
 * ];
*/