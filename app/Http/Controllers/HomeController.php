<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{
    Category, 
    StaticPages, 
    BlogPost,
    PostTag
};

class HomeController extends Controller
{
    public function index()
    {
        return redirect()->route(config('app.indexRoute'));
    }

    public function allCategories()
    {
    	$categories = Category::where('hidden', 0)->get();
    	return view('front.categories', ['categories' => $categories]);
    }

    public function showCategory($slug)
    {
        $category = Category::where([
            ['slug', $slug],
            ['hidden', 0]
        ])->first();
        if(!$category) return view('front.single-post-fail');
        $images = $category->images()->where('status', 1)->paginate(15);
        return view('front.category', ['category' => $category, 'images' => $images]);
    }

    public function getStaticPage($url)
    {
        $page = StaticPages::where('slug', $url)->first();
        if($page) return view('front.static', ['page' => $page]);
        return view('front.single-post-fail');
    }

    public function allPosts()
    {
        $posts = BlogPost::where('publication', 1)->orderBy('publication_date', 'desc')->paginate();
        return view('front.posts', ['posts' => $posts]);
    }

    public function showPost($slug)
    {
        $post = BlogPost::where([
            ['slug', $slug],
            ['publication', 1]
        ])->first();
        if(!$post) return view('front.single-post-fail');
        return view('front.single-post', ['post' => $post]);
    }

    public function showHiddenPost($slug, $openKey)
    {
        $post = BlogPost::where([
            ['slug', $slug]
        ])->first();

        if($post && $post->genPostOpenKey() == $openKey) return view('front.single-post', ['post' => $post]);
        return view('front.single-post-fail');
    }

    public function PostsByTag($tag)
    {
        $tag = PostTag::where([
            ['slug', $tag]
        ])->first();
        if(!$tag) return view('front.single-post-fail');

        $posts = $tag->posts()->where('publication', 1)->orderBy('publication_date', 'desc')->paginate();
        return view('front.posts', ['posts' => $posts]);
    }

    private static function genPostOpenKey($post)
    {
        if($post) return md5($post->id . '|' . $post->slug . '|' .config('app.hiddenPostSalt'));
    }
}