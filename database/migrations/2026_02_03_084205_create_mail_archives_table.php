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
        Schema::create('mail_archives', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['incoming', 'outgoing']);
            $table->string('reference_number');
            $table->date('date');
            $table->string('sender');
            $table->string('recipient');
            $table->string('subject');
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mail_archives');
    }
};
