<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

// class RoleSeeder extends Seeder
// {
//     public function run(): void
//     {
//         foreach (RoleEnum::cases() as $enum) {
//             Role::updateOrCreate(['name' => $enum->value]);
//             ['description' => Str::headline(str_replace('_', ' ', $enum->value))];
//         }
//     }
// }

//  AVANT
 class RoleSeeder extends Seeder {

     public function run(): void {
         Role::factory()->create(['name' => 'super_admin']);
         Role::factory()->create(['name' => 'staff']);
         Role::factory()->create(['name' => 'cse_admin']);
         Role::factory()->create(['name' => 'cse_member']);
     }
 }