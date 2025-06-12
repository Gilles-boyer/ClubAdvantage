<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        
        Schema::create('offers', function(Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();

            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');;
        });
    }

    public function down(): void {
        // 1) On supprime d’abord les contraintes FK
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropForeign(['category_id']);
        });
        // 2) Puis on supprime la table
        Schema::dropIfExists('offers');
    }
};
