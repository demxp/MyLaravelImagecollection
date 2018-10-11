<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class HomeController extends Controller
{
    public function index()
    {
    	$categories = Category::all();
    	return view('front.index', ['categories' => $categories]);
    }

    public function showCategory($slug)
    {
    	$category = Category::where('slug', $slug)->firstOrFail();
    	return view('front.category', ['category' => $category]);
    }
}
