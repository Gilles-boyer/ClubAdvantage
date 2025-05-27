<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::table('committees', function (Blueprint $table) {
            $table->dropColumn('created_by');
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    public function down(): void {
        // Schema::table('committees', function (Blueprint $table) {
        //     // $table->dropForeign('created_by');
        //     $table->string('created_by')->nullable()->after('auto_renew');
        // });
    }
};
