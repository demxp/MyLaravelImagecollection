<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
	const ADMIN_PAGES = ['images', 'categories', 'users', 'pages', 'posts', 'audiofiles', 'tags'];

	public function getpage($page=null)
	{
		$param = (in_array($page, self::ADMIN_PAGES)) ? $page : null;		

    	return view('admin.index', ['page' => $param]);
	}
}
