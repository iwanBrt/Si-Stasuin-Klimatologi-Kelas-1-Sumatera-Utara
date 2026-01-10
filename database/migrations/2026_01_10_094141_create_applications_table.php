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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Application Type & Status
            $table->string('application_type'); // magang, penelitian, pkl, etc
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('title');
            
            // Institution Data
            $table->string('institution_name');
            $table->string('institution_address')->nullable();
            $table->string('department');
            $table->string('study_program');
            $table->string('student_id');
            $table->string('phone');
            
            // Period
            $table->date('start_date');
            $table->date('end_date');
            
            // Research specific (nullable for non-research types)
            $table->string('research_field')->nullable();
            $table->text('research_objective')->nullable();
            
            // Supervisor
            $table->string('supervisor_name')->nullable();
            $table->string('supervisor_contact')->nullable();
            
            // Documents (file paths)
            $table->string('proposal_file')->nullable();
            $table->string('recommendation_letter')->nullable();
            $table->string('cv_file')->nullable();
            $table->string('transcript_file')->nullable();
            $table->string('identity_card_file')->nullable();
            
            // Additional info
            $table->text('additional_notes')->nullable();
            
            // Admin feedback
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->unsignedBigInteger('reviewed_by')->nullable();
            
            $table->timestamps();
            
            // Foreign key for reviewed_by only (user_id already has constraint from foreignId)
            $table->foreign('reviewed_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
