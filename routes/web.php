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

Route::group(['prefix' => 'api/v1', 'namespace' => 'ApiV1', 'middleware' => 'admin'], function(){
	Route::resource('/images', 'ImagesController');	
	Route::resource('/categories', 'CategoriesController');
	Route::resource('/users', 'UsersController');
	Route::resource('/staticpages', 'StaticPagesController');	
	Route::get('/users/{id}/rules', 'RulesController@getRules');
	Route::put('/users/{id}/rules', 'RulesController@setRules');
});

Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'admin'], function(){
	Route::get('/', 'DashboardController@index'); 
});

Route::post('/upload/gettoken', 'UsersController@getUploadToken');
Route::post('/upload', 'ImageController@saveUploadImage');
Route::get('/upload/getimage/{filename}/{thumbnail?}', 'ImageController@getUploadedImage');

Route::get('/register', 'AuthController@registerForm');
Route::post('/register', 'AuthController@register');

Route::get('/login', 'AuthController@loginForm');
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout');

Route::get('/category', [
	'as' => 'categories',
 	'uses' => 'HomeController@allCategories'
]);
Route::get('/category/{slug}', [
		'as' => 'showcategory', 
		'uses' => 'HomeController@showCategory'
]);
Route::get('/category/{slug}/list', [
		'as' => 'showcategoryaslist', 
		'uses' => 'HomeController@showCategoryAsList'
]);
Route::get('/{url}', [
		'as' => 'staticpage', 
		'uses' => 'HomeController@getStaticPage'
]);