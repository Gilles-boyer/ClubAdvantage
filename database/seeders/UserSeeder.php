<?php

namespace Database\Seeders;

use App\Models\Committee;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crée un seul admin 
        User::factory()->create([
            'role_id' => 1,
            'committee_id' => null,
            'email' => 'admin@example.com', // Pour test ou login (Plus-tard)
        ]);

        // Crée 3 staffs 
        User::factory(3)->create([
            'role_id' => 2,
            'committee_id' => null,
        ]);

        // Crée 10 membres
        User::factory(10)->create([
            'role_id' => 3,
        ]);

        // Crée 5 CSE
        User::factory(5)->create([
            'role_id' => 4,
        ]);
            
    }
}
/**-----------------Des éventuelle ESSAIS----------------
 * 
 //     // === Affectation des committees ===
 //     $committees = Committee::all();
     
 //     if ($committees->count() > 0) {
 //     $cseUsers = User::where('role_id', 4)->get();
 //     foreach ($cseUsers as $index => $user) {
 //         $user->committee_id = $committees[$index % $committees->count()]->id;
 //         $user->save();
 //     }
 
 //     $memberUsers = User::where('role_id', 3)->get();
 //     foreach ($memberUsers as $user) {
 //         $user->committee_id = $committees->random()->id;
 //         $user->save(); 
 //     }
 // } else {
 //     echo "nop";
 // }
 *
 *
*/