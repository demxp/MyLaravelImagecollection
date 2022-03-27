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

mix.js('resources/assets/js/appwebsite.js', 'public/js');

mix.styles([
	'resources/assets/front/stylesheets/bootstrap.css',
	'resources/assets/front/stylesheets/style.css',
	'resources/assets/front/stylesheets/font-awesome.css',	
	'resources/assets/front/stylesheets/responsive.css',
	'resources/assets/front/stylesheets/shortcodes.css',	
	'resources/assets/front/stylesheets/colors/color1.css',
	'resources/assets/front/stylesheets/animate.css',
	'resources/assets/front/stylesheets/magnific-popup.css',	
], 'public/css/front.css');


mix.scripts([
	'resources/assets/front/javascript/jquery.min.js',
	'resources/assets/front/javascript/bootstrap.min.js',
	'resources/assets/front/javascript/jquery.easing.js',
	'resources/assets/front/javascript/jquery-waypoints.js',
	'resources/assets/front/javascript/jquery.cookie.js',
	'resources/assets/front/javascript/imagesloaded.min.js',	
	'resources/assets/front/javascript/jquery.isotope.min.js',	
	'resources/assets/front/javascript/jquery.magnific-popup.min.js',	
	'resources/assets/front/javascript/main.js',
], 'public/js/front.js');


mix.copy('resources/assets/front/icon','public/icon');
mix.copy('resources/assets/front/images','public/img');
mix.copy('resources/assets/front/fonts','public/fonts');