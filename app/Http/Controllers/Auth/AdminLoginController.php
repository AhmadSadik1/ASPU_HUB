<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // <-- تأكد من استيراد مودل User
use Illuminate\Support\Facades\Hash; // <-- تأكد من استيراد Hash

class AdminLoginController extends Controller
{
    /**
     * عرض صفحة تسجيل الدخول الخاصة بالمدير
     */
    public function showLoginForm()
    {
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return view('auth.admin-login');
    }

    /**
     * معالجة طلب تسجيل الدخول (مع كود التصحيح)
     */
    public function login(Request $request)
    {
        // 1. التحقق من صحة المدخلات
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // ---==[ بداية كود التصحيح ]==---

        // الخطوة أ: ابحث عن المستخدم يدويًا عن طريق البريد الإلكتروني
        $user = User::where('email', $credentials['email'])->first();

        // الخطوة ب: تحقق إذا كان المستخدم غير موجود
        if (!$user) {
            dd('خطأ: المستخدم بالبريد الإلكتروني ' . $credentials['email'] . ' غير موجود في قاعدة البيانات. الرجاء تنفيذ الأمر php artisan migrate:fresh --seed');
        }

        // الخطوة ج: تحقق من كلمة المرور يدويًا
        if (!Hash::check($credentials['password'], $user->password)) {
            dd('خطأ: كلمة المرور التي أدخلتها غير صحيحة. كلمة المرور الصحيحة هي "password123". تأكد من حالة الأحرف.');
        }

        // الخطوة د: تحقق من صلاحية المدير
        if ($user->roleID != 2) {
            dd('خطأ: صلاحية هذا المستخدم ليست 2. القيمة الحالية هي: ' . $user->roleID . '. تأكد من تحديث دالة isAdmin() و ملف الـ Seeder.');
        }

        // ---==[ نهاية كود التصحيح ]==---


        // إذا نجحت جميع خطوات التصحيح، قم بمحاولة تسجيل الدخول الفعلية
        if (Auth::attempt($credentials)) {
            if (Auth::user()->isAdmin()) {
                $request->session()->regenerate();
                return redirect()->intended(route('admin.dashboard'));
            }

            Auth::logout();
            return back()->withErrors([
                'email' => 'هذه الصلاحيات لا تخولك للدخول.',
            ]);
        }

        return back()->withErrors([
            'email' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        ]);
    }

    /**
     * تسجيل الخروج
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
}
