<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    
    public function up(): void {
        Schema::create('committees', function(Blueprint $table) {
            $table->id();
            $table->string('name');
                // DB::raw permet d’écrire une expression SQL brute.
                // Ici, on indique à MySQL de remplir automatiquement agreement_start_date avec la date du jour (CURRENT_DATE)
                // sans passer par PHP ou Laravel.
            $table->date('agreement_start_date')->default(DB::raw('CURRENT_DATE'));
            $table->date('agreement_end_date');
            $table->boolean('auto_renew');
            $table->timestamps();
            $table->softDeletes();
            $table->integer("created_by");
        });
    }

    public function down(): void
    {
        //
    }
};
