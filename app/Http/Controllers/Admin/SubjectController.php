<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Specialization; // لا تنسَ استيراد مودل التخصصات

class SubjectController extends Controller
{

    public function create()
    {

        $specializations = Specialization::all();
        return view('admin.subjects.create', ['specializations' => $specializations]);
    }










    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:subjects,name',
            'hour_count' => 'required|integer|min:1',
            'Description' => 'nullable|string',
            'SpecializationID' => 'required|exists:specializations,SpecializationID',
        ]);

       
        $validatedData['status'] = 'approved';

        Subject::create($validatedData);

        return redirect()->route('admin.dashboard')->with('success', 'Subject created successfully!');
    }




}
