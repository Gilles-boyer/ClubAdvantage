<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Committee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
    public function run(): void {

        // Crée un seul admin 
        User::factory()->create([
            'role_name'     => RoleEnum::SUPER_ADMIN->value,
            'role_id'       => Role::where('name', RoleEnum::SUPER_ADMIN->value)->value('id'),
            'committee_id'  => null,
            'email'         => 'admin@example.com',
            'password'      => Hash::make('manger12345'), // <- Hachage important ici !
        ]);

        // Crée 3 staffs 
        User::factory(5)->create([
            'role_name'     => RoleEnum::STAFF->value,
            'role_id'       => Role::where('name', RoleEnum::STAFF->value)->value('id'),
            'committee_id'  => null,
        ]);

        // Crée 10 cse_admin
        User::factory(200)->forCse() ->create([
            'role_name'     => RoleEnum::CSE_ADMIN->value,
            'role_id'       => Role::where('name', RoleEnum::CSE_ADMIN->value)->value('id'),
        ]);

        // Crée 10 cse_member
        User::factory(500)->forCse() ->create([
            'role_name'     => RoleEnum::CSE_MEMBER->value,
            'role_id'       => Role::where('name', RoleEnum::CSE_MEMBER->value)->value('id'),
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
