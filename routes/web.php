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
Route::get('/admin/{part?}', 'Admin\DashboardController@getpage')->middleware('admin')->name('adminpage');

Route::group(['prefix' => 'api/v1', 'namespace' => 'ApiV1', 'middleware' => 'admin'], function(){
	Route::resource('/images', 'ImagesController');	
	Route::resource('/categories', 'CategoriesController');
	Route::resource('/users', 'UsersController');
	Route::resource('/staticpages', 'StaticPagesController');	
	Route::resource('/posts', 'BlogPostsController');
	Route::resource('/audiofiles', 'AudiofilesController');
	Route::get('/users/{id}/rules', 'RulesController@getRules');
	Route::put('/users/{id}/rules', 'RulesController@setRules');
});

Route::post('/upload/gettoken', 'UsersController@getUploadToken');
Route::post('/upload', 'ImageController@saveUploadImage');
Route::get('/upload/getimage/{filename}/{thumbnail?}', 'ImageController@getUploadedImage');

// Route::get('/register', 'AuthController@registerForm');
// Route::post('/register', 'AuthController@register');

Route::get('/login', 'AuthController@loginForm');
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

Route::get('/category', 'HomeController@allCategories')->name('categories');
Route::get('/category/{slug}', 'HomeController@showCategory')->name('showcategory');
Route::get('/posts', 'HomeController@allPosts')->name('posts');
Route::get('/post/{slug}', 'HomeController@showPost')->name('showpost');
Route::get('/{url}', 'HomeController@getStaticPage')->name('staticpage');