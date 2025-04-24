<?php
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\StudentAuthController;
use App\Http\Controllers\Api\SuperAdminAuthController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VerificationController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\PasswordResetCodeController;
use App\Http\Controllers\Api\CummunityController;
use App\Http\Controllers\Api\NotificationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/verify-email', [RegistrationController::class, 'verifyEmail']);


Route::get('/user', function (Request $request) {
    return "request->user()";
});


Route::prefix('student')->group(function () {
    Route::post('/login', [StudentAuthController::class, 'login'])->name('login');
   
   
    Route::middleware('auth:student')->group(function () {
        Route::post('/logout', [StudentAuthController::class, 'logout']);
        Route::get('/dashboard', [StudentAuthController::class, 'dashboard']);

Route::post('/password/send-code', [PasswordResetCodeController::class, 'sendResetCode'])
    ->name('password.send.code');
Route::post('/password/reset', [PasswordResetCodeController::class, 'verifyCodeAndResetPassword'])
    ->name('password.reset.submit');  
Route::post('create_notification', [NotificationController::class,'create_notification']);
Route::get('get_all_notification', [NotificationController::class,'get_all_notification']);
Route::get('post/get',[PostController::class,'GetAllPost'] );
Route::post('post/Add',[PostController::class,'Addpost'] );
    Route::post('AddComment', [ProfileController::class,'AddComment']);
    Route::get('Getuserinfo', [ProfileController::class,'getProfile']);
    Route::get('Getuserpost', [ProfileController::class,'getUserPosts']);
    Route::get('Getusercomment', [ProfileController::class,'getUserComments']);
    Route::put('VotePost', [ProfileController::class,'votePost']);
    Route::post('Get_Comuuinty_post', [CummunityController::class,'Get_All_Post']);
    Route::get('Get_user_subject', [ProfileController::class,'Get_user_subject']);
    Route::post('Add_new_subject', [ProfileController::class,'Add_new_subject']);
    Route::get('Get_subject_info', [ProfileController::class,'Get_subject_info']);
    });
});




Route::get('/verify-email', [VerificationController::class, 'verify']);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::middleware('auth:admins')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);


        Route::post('/email/resend',[[RegistrationController::class,'resend']]);
     });
});

// Super Admin Routes
Route::prefix('super-admin')->group(function () {
    Route::post('/login', [SuperAdminAuthController::class, 'login']);
    Route::middleware('auth:superAdmins')->group(function () {
        Route::post('/logout', [SuperAdminAuthController::class, 'logout']);
        Route::post('/email/resend',[[RegistrationController::class,'resend']]);
     });
});
//////////////////////home page api////////////////////////////
