<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{


    public function create()
    {
        return view('admin.tags.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:tags,name|max:50',
        ]);

        Tag::create(['name' => $request->name]);


        return redirect()->route('admin.dashboard')->with('success', 'Subject created successfully!');
    }
}

