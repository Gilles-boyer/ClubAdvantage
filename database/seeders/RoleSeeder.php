<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {

    public function run(): void {
        Role::factory()->create(['name' => 'admin']);
        Role::factory()->create(['name' => 'staff']);
        Role::factory()->create(['name' => 'member']);
        Role::factory()->create(['name' => 'cse']);
    }
}
