<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('committees', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('agreement_start_date');
            $table->date('agreement_end_date');
            $table->boolean('auto_renew');
            $table->timestamps(); // Laravel écrit manuellement les deux autres ligne, mais on plus de prise dessus(2)
            // $table->timestamp('created_at'); (2)
            // $table->timestamp('udpated_at'); (2)
            $table->softDeletes();
            $table->integer("created_by");
        });
    }

    public function down(): void
    {
        //
    }
};
