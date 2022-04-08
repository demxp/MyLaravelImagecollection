let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/appadmin.js', 'public/js').extract(['vue', 'jquery', 'moment']).version().mergeManifest();


mix.styles([
	'resources/assets/admin/bootstrap/css/bootstrap.min.css',
	'resources/assets/admin/font-awesome/4.5.0/css/font-awesome.min.css',
	'resources/assets/admin/ionicons/2.0.1/css/ionicons.min.css',
	'resources/assets/admin/dist/css/skins/_all-skins.min.css',
	'resources/assets/admin/dist/css/AdminLTE.min.css',	
	'resources/assets/admin/dist/css/style_add.css'
], 'public/css/admin.css').version().mergeManifest();

mix.scripts([
	'resources/assets/admin/bootstrap/js/bootstrap.min.js',
	'resources/assets/admin/dist/js/app.min.js',
	'resources/assets/admin/dist/js/promise.js',
	'resources/assets/admin/dist/js/nicEdit.js',
], 'public/js/admin.js').version().mergeManifest();

mix.copy('resources/assets/admin/bootstrap/fonts','public/fonts');
mix.copy('resources/assets/admin/dist/img', 'public/img');