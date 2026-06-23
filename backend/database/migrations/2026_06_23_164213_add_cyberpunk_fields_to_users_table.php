<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('alias')->nullable();
            $table->text('bio')->nullable();
            $table->string('active_mission')->default('Data Heist');
            $table->string('avatar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
        public function down(): void
        {
            Schema::table('users', function (Blueprint $table) {
                // On supprime les colonnes si on annule la migration
                $table->dropColumn(['alias', 'bio', 'active_mission', 'avatar']);
            });
        }
};
