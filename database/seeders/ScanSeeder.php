<?php

namespace Database\Seeders;

use App\Models\Scan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScanSeeder extends Seeder {

    public function run(): void {
        Scan::factory()->count(20)->create();
    }
}
