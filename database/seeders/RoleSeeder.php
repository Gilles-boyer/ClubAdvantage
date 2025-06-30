<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (RoleEnum::cases() as $enum) {
            Role::firstOrCreate(['name' => $enum->value]);
        }
    }
}

//  AVANT
//  class RoleSeeder extends Seeder {

//      public function run(): void {
//          Role::factory()->create(['name' => 'super_admin']);
//          Role::factory()->create(['name' => 'staff']);
//          Role::factory()->create(['name' => 'cse_admin']);
//          Role::factory()->create(['name' => 'cse_member']);
//      }
//  }