<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::table('committees', function (Blueprint $table) {
            $table->unsignedBigInteger('created_by')->nullable()->change();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::table('committees', function (Blueprint $table) {
            // 1) On droppe la FK
            $table->dropForeign(['created_by']);
            // 2) On revient à un simple integer (ou on drop la colonne)
            $table->integer('created_by')->nullable()->change();
        });
    }
};
