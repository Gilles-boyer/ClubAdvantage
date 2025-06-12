<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    public function up(): void {

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('remember_token')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('terms_accepted_at')->nullable();
            $table->enum('status', ['active', 'inactive', 'expired'])->default('active');
            $table->string('role_name');
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('committee_id')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('committee_id')->references('id')->on('committees')->onDelete('set null');
            $table->foreign('role_name')->references('name')->on('roles')->onDelete('restrict');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('restrict');
        });
    }

    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['committee_id']);
            $table->dropForeign(['role_id']);
            $table->dropForeign(['role_name']);
        });
        Schema::dropIfExists('users');
    }
};
