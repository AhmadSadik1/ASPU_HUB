<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommunityController extends Controller
{

    public function index()
    {

        $communities = Auth::user()->managedCommunities()->get();


        return view('admin.communities.index', ['communities' => $communities]);
    }


    
}

