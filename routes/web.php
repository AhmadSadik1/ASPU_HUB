<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\CommunityController;
use App\Http\Controllers\Admin\SubjectController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});




    Route::get('admin/login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('admin/login', [AdminLoginController::class, 'login']);




Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {


    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::post('logout', [AdminLoginController::class, 'logout'])->name('logout');

    Route::get('communities', [CommunityController::class, 'index'])->name('communities.index');

    Route::get('subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
    Route::post('subjects', [SubjectController::class, 'store'])->name('subjects.store');




    Route::get('tags/create', [App\Http\Controllers\Admin\TagController::class, 'create'])->name('tags.create');
    Route::post('/tags', [App\Http\Controllers\Admin\TagController::class, 'store'])->name('tags.store');

    Route::prefix('reports')->name('reports.')->group(function () {


        Route::get('/{report}', [ReportController::class, 'show'])->name('show');




        Route::post('/{report}/resolve', [ReportController::class, 'resolve'])->name('resolve');


        Route::delete('/{report}/delete-content', [ReportController::class, 'deleteContent'])->name('deleteContent');


        Route::delete('/{report}/ban-user', [ReportController::class, 'banUser'])->name('banUser');




    });

});
