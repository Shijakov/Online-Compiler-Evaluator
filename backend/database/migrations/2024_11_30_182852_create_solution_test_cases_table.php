<?php

use App\Models\Solution;
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
        Schema::create('solution_test_cases', function (Blueprint $table) {
            $table->id();
            $table->string('input')->nullable(false);
            $table->string('output')->nullable(false);
            $table->string('expected_output')->nullable(false);
            $table->boolean('is_correct')->nullable(false);
            $table->foreignIdFor(Solution::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solution_test_cases');
    }
};
