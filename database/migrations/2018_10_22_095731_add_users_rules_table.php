<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUsersRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_rules', function (Blueprint $table) {
            $table->unique(['user_id', 'component', 'method']);
            $table->integer('user_id');
            $table->string('component');
            $table->string('method');
            $table->string('rule')->default('deny');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_rules');
    }
}
