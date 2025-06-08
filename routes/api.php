<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\{
    PostController,
    CommentController,
    AdminAuthController,
    StudentAuthController,
    SuperAdminAuthController,
    ProfileController,
    CummunityController,
    VerificationController,
    RegistrationController,
    PasswordResetCodeController,
    UserSubjectController,
    NotificationController,
    SubjectController,
    TagController,
    CommunitySubscriptionController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application.
|--------------------------------------------------------------------------
*/

// ==============================
// 🚀 Public Routes (No Auth)
// ==============================

// Registration & Verification
Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/verify-email', [RegistrationController::class, 'verifyEmail']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Student Auth (Login & Password Reset)
Route::prefix('student')->group(function () {
    Route::post('/login', [StudentAuthController::class, 'login'])->name('login');
    Route::post('/password/send-code', [PasswordResetCodeController::class, 'sendResetCode'])->name('password.send.code');
    Route::post('/password/reset', [PasswordResetCodeController::class, 'verifyCodeAndResetPassword'])->name('password.reset.submit');

    // ==============================
    // 🔐 Protected Student Routes
    // ==============================
    Route::middleware(['auth:sanctum', 'blocked'])->group(function () {
        // Auth
        Route::post('/logout', [StudentAuthController::class, 'logout']);
        Route::get('/dashboard', [StudentAuthController::class, 'dashboard']);

        // 🧠 Subjects
        Route::get('/subjects/all-for-setup', [UserSubjectController::class, 'getAllSubjectsForInitialSetup']);
        Route::post('/subjects/submit-initial', [UserSubjectController::class, 'submitInitialCompletedSubjects']);
        Route::post('/subjects/register-for-semester', [UserSubjectController::class, 'registerSubjectsForSemester']);
        Route::post('/subjects/complete', [UserSubjectController::class, 'completeSubjects']);
        Route::post('/subjects/confirm-completed', [UserSubjectController::class, 'confirmCompletedSubjects']);
        Route::get('/subjects/available', [UserSubjectController::class, 'getAvailableSubjects']);
        Route::post('/specialization/change', [UserSubjectController::class, 'changeSpecialization']);

        // 🧾 Posts
        Route::get('/post/get', [CummunityController::class, 'GetAllPost']);
        Route::get('/post/general', [CummunityController::class, 'allPostGeneral']);
        Route::get('/post/software', [CummunityController::class, 'allPostSoftware']);
        Route::get('/post/network', [CummunityController::class, 'allPostNetwork']);
        Route::post('/post/Add', [PostController::class, 'Addpost']);
        Route::post('/post/{post}/update', [PostController::class, 'updatePost']);
        Route::delete('/post/{post}/delete', [PostController::class, 'deletePost']);
        Route::post('/VotePost', [PostController::class, 'votePost']);
        Route::get('/posts/by-tag/{tag}', [PostController::class, 'getPostsByTag']);
        Route::post('/posts/{post}/report', [PostController::class, 'report'])->name('posts.report');

        // 🏷️ Tags
        Route::get('/tags', [TagController::class, 'index']);
        Route::post('/tags', [TagController::class, 'store']);

        // 🗨️ Comments
        Route::post('/AddComment', [CommentController::class, 'addComment']);
        Route::post('/VoteComment', [CommentController::class, 'voteComment']);
        Route::post('/comment/{comment}/update', [CommentController::class, 'updateComment']);
        Route::delete('/comment/{comment}/delete', [CommentController::class, 'deleteComment']);
        Route::post('/comments/{comment}/report', [CommentController::class, 'report'])->name('comments.report');

        // 👤 Profile & Subjects
        Route::get('/userpost', [ProfileController::class, 'getUserPosts']);
        Route::get('/Get_user_subject', [ProfileController::class, 'Get_user_subject']);
        Route::post('/Add_new_subject', [ProfileController::class, 'Add_new_subject']);
        Route::get('/Get_subject_info', [ProfileController::class, 'Get_subject_info']);
        Route::get('/Getuserinfo', [ProfileController::class, 'getProfile']);
        Route::get('/Getusercomment', [ProfileController::class, 'getUserComments']);

        // 🌐 Community
        Route::post('/Get_Comuuinty_post', [CummunityController::class, 'Get_All_Post']);
        Route::post('/communities/subscribe', [CommunitySubscriptionController::class, 'subscribe']);

        // 🔔 Notifications
        Route::post('/create_notification', [NotificationController::class, 'create_notification']);
        Route::get('/get_all_notification', [NotificationController::class, 'get_all_notification']);
    });
});

// ==============================
// 🛠️ Admin Routes
// ==============================
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:admins')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::post('/email/resend', [RegistrationController::class, 'resend']);
    });
});

// ==============================
// 👑 Super Admin Routes
// ==============================
Route::prefix('super-admin')->group(function () {
    Route::post('/login', [SuperAdminAuthController::class, 'login']);

    Route::middleware('auth:superAdmins')->group(function () {
        Route::post('/logout', [SuperAdminAuthController::class, 'logout']);
        Route::post('/email/resend', [RegistrationController::class, 'resend']);
    });
});
