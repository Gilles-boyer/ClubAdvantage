<?php

namespace Database\Seeders;

use App\Models\Committee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {

    public function run(): void {
        // Crée un seul admin 
        User::factory()->create([
            'role_name'    => 'super_admin',
            'role_id'      => Role::where('name', 'super_admin')->first()?->id,
            'committee_id' => null,
            'email'        => 'admin@example.com',
            'password'     => Hash::make('manger12345'), // <- Hachage important ici !
        ]);

        // Crée 3 staffs 
        User::factory(3)->create([
            'role_name'    => 'staff',
            'role_id'      => Role::where('name', 'staff')->first()?->id,
            'committee_id' => null,
        ]);

        // Crée 5 CSE
        User::factory(5)->create([
            'role_name' => 'cse_member',
            'role_id'   => Role::where('name', 'cse_member')->first()?->id,
        ]);
        
        // Crée 10 membres
        User::factory(10)->create([
            'role_name'  => 'cse_admin',
            'role_id'      => Role::where('name', 'cse_admin')->first()?->id,
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
