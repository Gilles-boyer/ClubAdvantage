<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {

    public function run(): void {
        Role::factory()->create(['name' => 'super_admin']);
        Role::factory()->create(['name' => 'staff']);
        Role::factory()->create(['name' => 'cse_admin']);
        Role::factory()->create(['name' => 'cse_member']);
    }
}
