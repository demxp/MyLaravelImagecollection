<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\StaticPages;

class HomeController extends Controller
{
    public function index()
    {
        return redirect()->route('categories');
    }
    
    public function allCategories()
    {
    	$categories = Category::all();
    	return view('front.categories', ['categories' => $categories]);
    }

    public function showCategory($slug)
    {
    	$category = Category::where('slug', $slug)->firstOrFail();
    	return view('front.category', ['category' => $category]);
    }

    public function showCategoryAsList($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $images = $category->images()->where('status', 1)->paginate(10);
        return view('front.categoryList', ['category' => $category, 'images' => $images]);
    }

    public function getStaticPage($url)
    {
        $page = StaticPages::where('slug', $url)->firstOrFail();

        return view('front.static', ['page' => $page]);
    }
}
