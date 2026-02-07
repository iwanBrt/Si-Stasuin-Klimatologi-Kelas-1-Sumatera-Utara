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
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->string('section')->index(); // e.g. 'normal_hujan', 'zom', 'team', 'extreme_weather'
            $table->string('category')->nullable(); // e.g. 'peta', 'grafik', 'pimpinan'
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->integer('sort_order')->default(0);
            $table->json('metadata')->nullable(); // For extra fields if needed
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
