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
        Schema::table('applications', function (Blueprint $table) {
            $table->string('department')->nullable()->change();
            $table->string('study_program')->nullable()->change();
            $table->string('student_id', 50)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('department')->nullable(false)->change();
            $table->string('study_program')->nullable(false)->change();
            $table->string('student_id', 50)->nullable(false)->change();
        });
    }
};
