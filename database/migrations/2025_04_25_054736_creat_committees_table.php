<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('committees', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('agreement_start_date');
            $table->date('agreement_end_date');
            $table->boolean('auto_renew');
            $table->unsignedBigInteger('created_by'); // Ce champ permet de savoir qui a créé l'entrée. (1)
            $table->timestamps(); // Laravel écrit manuellement les deux autres ligne (2)
            // $table->timestamp('created_at'); (2)
            // $table->timestamp('udpated_at'); (2)
            $table->softDeletes();
            $table->foreign('created_by')->references('id')->on('users'); // + ce champ (1)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
