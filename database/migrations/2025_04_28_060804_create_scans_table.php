<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('scans', function (Blueprint $table) {
            $table->id();
            $table->timestamp('scanned_at');
            $table->unsignedBigInteger('scanned_by')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // L'utilisateur STAFF qui fait un scan
            $table->foreign('scanned_by')->references('id')->on('users');
            // L'utilisateur Membre du CSE / CSE qui se fait scanner
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    public function down(): void {
        Schema::dropIfExists('scans');
    }
};
