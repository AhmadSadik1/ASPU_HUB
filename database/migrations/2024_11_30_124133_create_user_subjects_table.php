<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_subjects', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('userID');
            $table->unsignedBigInteger('subjectID');
            $table->float('mark')->default(0)->change();
            $table->unsignedBigInteger('semesterID');
            $table->foreign('subjectID')->references('id')->on('subjects')->onDelete('cascade');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('semesterID')->references('id')->on('user_semesters')->onDelete('cascade');
            $table->boolean('has_been_finished')->default(false);
            $table->boolean('has_been_canceled')->default(false);

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
        Schema::dropIfExists('user_subjects');
    }
};
