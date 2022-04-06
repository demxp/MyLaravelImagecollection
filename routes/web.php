<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'admin'], function(){
	Route::get('/post/{slug}/comments', 'CommentController@getPostComments');
	Route::post('/post/{slug}/comments', 'CommentController@savePostComment');
	Route::put('/post/{slug}/comments', 'CommentController@editPostComments');
	Route::delete('/post/{slug}/comments', 'CommentController@deletePostComments');
	Route::get('/{part?}', 'DashboardController@getpage')->name('adminpage');
});

Route::group(['prefix' => 'api/v1', 'namespace' => 'ApiV1', 'middleware' => 'admin'], function(){
	Route::resource('/images', 'ImagesController');	
	Route::resource('/categories', 'CategoriesController');
	Route::resource('/users', 'UsersController');
	Route::resource('/staticpages', 'StaticPagesController');	
	Route::resource('/posts', 'BlogPostsController');
	Route::resource('/audiofiles', 'AudiofilesController');
	Route::resource('/tags', 'TagsController');
	Route::get('/users/{id}/rules', 'RulesController@getRules');
	Route::put('/users/{id}/rules', 'RulesController@setRules');
});

Route::post('/upload/gettoken', 'UsersController@getUploadToken');
Route::post('/upload', 'ImageController@saveUploadImage');
Route::get('/upload/getimage/{filename}/{thumbnail?}', 'ImageController@getUploadedImage');

// Route::get('/register', 'AuthController@registerForm');
// Route::post('/register', 'AuthController@register');

Route::get('/login', 'AuthController@loginForm')->middleware('ipblock');
Route::post('/login', 'AuthController@login')->middleware('ipblock');
Route::get('/logout', 'AuthController@logout')->middleware('ipblock');

Route::get('/category', 'HomeController@allCategories')->name('categories');
Route::get('/category/{slug}', 'HomeController@showCategory')->name('showcategory');
Route::get('/posts', 'HomeController@allPosts')->name('posts');
Route::get('/posts/{tag}', 'HomeController@PostsByTag')->name('postsbytag');
Route::get('/post/{slug}', 'HomeController@showPost')->name('showpost');
Route::get('/{url}', 'HomeController@getStaticPage')->name('staticpage');
Route::get('/post/{slug}/comments', 'CommentController@getPostComments');
Route::post('/post/{slug}/comments', 'CommentController@savePostComment');
Route::put('/post/{slug}/comments', 'CommentController@editPostComments');
Route::delete('/post/{slug}/comments', 'CommentController@deletePostComments');