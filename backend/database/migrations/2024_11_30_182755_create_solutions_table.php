<?php

use App\Models\Problem;
use App\Models\User;
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
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->text('code')->nullable(false);
            $table->string('status')->nullable(false);
            $table->text('output')->nullable(false);
            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Problem::class)->constrained()->cascadeOnDelete();
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
