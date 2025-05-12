<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('committee_offers', function (Blueprint $table) {
            $table->unsignedBigInteger('committee_id');
            $table->unsignedBigInteger('offer_id');
            $table->timestamp('assigned_at');
        
            $table->primary(['committee_id', 'offer_id']);
        
            $table->foreign('committee_id')->references('id')->on('committees')->onDelete('cascade');
            $table->foreign('offer_id')->references('id')->on('offers')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('committee_offers');
    }
};
