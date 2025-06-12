<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {

        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->date('agreement_start_date')->default(DB::raw('CURRENT_DATE'));
            $table->date('agreement_end_date');
            $table->boolean('auto_renew');
            $table->integer("created_by");
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('committees');
    }
};
