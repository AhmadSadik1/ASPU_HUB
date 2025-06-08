<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * عرض تفاصيل إبلاغ معين.
     */
    public function show(Report $report)
    {
        $report->load('reporter', 'reportable');
        return view('admin.reports.show', ['report' => $report]);
    }

    /**
     * ✅ [جديد] حذف المحتوى المُبلغ عنه.
     */
    public function deleteContent(Report $report)
    {
        // احذف المحتوى المرتبط بالإبلاغ (المنشور أو التعليق)
        $report->reportable->delete();

        // قم بتغيير حالة الإبلاغ إلى "تم الحل"
        $report->update(['status' => 'resolved']);

        return redirect()->route('admin.dashboard')->with('success', 'Content has been deleted successfully.');
    }

    /**
     * ✅ [جديد] حظر المستخدم الذي قام بنشر المحتوى.
     */
    public function banUser(Report $report)
    {
        // ابحث عن المستخدم الذي نشر المحتوى
        $userToBan = $report->reportable->user;

        // قم بتغيير حالته إلى محظور
        $userToBan->update(['is_blocked' => true]);

        // قم أيضًا بحذف المحتوى كإجراء إضافي
        $report->reportable->delete();

        // قم بتغيير حالة الإبلاغ إلى "تم الحل"
        $report->update(['status' => 'resolved']);

        return redirect()->route('admin.dashboard')->with('success', 'User has been banned and content deleted.');
    }

    /**
     * ✅ [جديد] تعليم الإبلاغ على أنه "تم الحل" بدون حذف.
     */
    public function resolve(Report $report)
    {
        $report->update(['status' => 'resolved']);

        return redirect()->route('admin.dashboard')->with('success', 'Report has been marked as resolved.');
    }
}
