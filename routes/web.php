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

Route::get('/', [
	'as' => 'home',
 	'uses' => 'HomeController@index'
 ]);
Route::get('/category/{slug}', [
		'as' => 'showcategory', 
		'uses' => 'HomeController@showCategory'
]);
Route::get('/register', 'AuthController@registerForm');
Route::post('/register', 'AuthController@register');

Route::get('/login', 'AuthController@loginForm');
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function(){
	Route::get('/', 'DashboardController@index'); 
	Route::resource('/categories', 'CategoriesController');	
	Route::resource('/tags', 'TagsController');		
	Route::resource('/users', 'UsersController');			
	Route::resource('/images', 'ImagesController');	
	Route::post('/ajax', 'AjaxController@init');			
});

Route::post('/upload/gettoken', 'UsersController@getUploadToken');
Route::post('/upload', 'ImageController@saveUploadImage');
Route::get('/upload/getimage/{filename}/{thumbnail?}', 'ImageController@getUploadedImage');