<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
	public function getpage($page=null)
	{
		$allowed_pages = ['images', 'categories', 'users', 'pages', 'posts'];    	
		
		$param = (in_array($page, $allowed_pages)) ? $page : null;		

    	return view('admin.index', ['page' => $param]);
	}
}
