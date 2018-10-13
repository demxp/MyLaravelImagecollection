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

mix.styles([
	'resources/assets/admin/bootstrap/css/bootstrap.min.css',
	'resources/assets/admin/font-awesome/4.5.0/css/font-awesome.min.css',
	'resources/assets/admin/ionicons/2.0.1/css/ionicons.min.css',
	'resources/assets/admin/dist/css/skins/_all-skins.min.css',
	'resources/assets/admin/plugins/iCheck/all.css',	
	'resources/assets/admin/plugins/iCheck/minimal/_all.css',
	'resources/assets/admin/plugins/datepicker/datepicker3.css',
	'resources/assets/admin/plugins/select2/select2.min.css',
	'resources/assets/admin/plugins/datatables/dataTables.bootstrap.css',
	'resources/assets/admin/dist/css/AdminLTE.min.css',	
], 'public/css/admin.css');

mix.scripts([
	'resources/assets/admin/plugins/jQuery/jquery-2.2.3.min.js',
	'resources/assets/admin/bootstrap/js/bootstrap.min.js',
	'resources/assets/admin/plugins/slimScroll/jquery.slimscroll.min.js',
	'resources/assets/admin/plugins/fastclick/fastclick.js',
	'resources/assets/admin/dist/js/app.min.js',
	'resources/assets/admin/dist/js/demo.js',
	'resources/assets/admin/plugins/select2/select2.full.min.js',
	'resources/assets/admin/plugins/datepicker/bootstrap-datepicker.js',
	'resources/assets/admin/plugins/slimScroll/jquery.slimscroll.min.js',
	'resources/assets/admin/plugins/fastclick/fastclick.js',
	'resources/assets/admin/plugins/iCheck/icheck.min.js',
	'resources/assets/admin/plugins/datatables/jquery.dataTables.min.js',
	'resources/assets/admin/plugins/datatables/dataTables.bootstrap.min.js',
	'resources/assets/admin/dist/js/script.js',
	'resources/assets/admin/dist/js/promise.js'
], 'public/js/admin.js');

mix.copy('resources/assets/admin/bootstrap/fonts','public/fonts');
mix.copy('resources/assets/admin/dist/fonts','public/fonts');
mix.copy('resources/assets/admin/dist/img','public/img');
mix.copy('resources/assets/admin/plugins/iCheck/minimal/blue.png', 'public/css');
mix.copy('resources/assets/admin/dist/js/imageResizer.js','public/js');
mix.copy('resources/assets/admin/dist/img/loading.gif', 'public/img');

mix.styles([
	'resources/assets/front/stylesheets/bootstrap.css',
	'resources/assets/front/stylesheets/font-awesome.css',
	'resources/assets/front/stylesheets/flexslider.css',
	'resources/assets/front/stylesheets/owl.carousel.css',
	'resources/assets/front/stylesheets/shortcodes.css',
	'resources/assets/front/stylesheets/jquery.flex-images.css',
	'resources/assets/front/stylesheets/simple-line-icons.css',
	'resources/assets/front/stylesheets/flaticon.css',
	'resources/assets/front/stylesheets/swiper.min.css',
	'resources/assets/front/stylesheets/revolution-slider.css',
	'resources/assets/front/stylesheets/magnific-popup.css',
	'resources/assets/front/stylesheets/style.css',
	'resources/assets/front/stylesheets/responsive.css',
	'resources/assets/front/stylesheets/colors/color5.css',
	'resources/assets/front/stylesheets/animate.css',
	'resources/assets/front/stylesheets/progressive-image.min.css',
	'resources/assets/front/stylesheets/iview.css',
	'resources/assets/front/stylesheets/iview.custom.css'
], 'public/css/front.css');


mix.scripts([
	'resources/assets/front/javascript/jquery.min.js',
	'resources/assets/front/javascript/bootstrap.min.js',
	'resources/assets/front/javascript/jquery.easing.js',
	'resources/assets/front/javascript/jquery-waypoints.js',
	'resources/assets/front/javascript/imagesloaded.min.js',
	'resources/assets/front/javascript/jquery.isotope.min.js',
	'resources/assets/front/javascript/jquery-countTo.js',
	'resources/assets/front/javascript/jquery.cookie.js',
	'resources/assets/front/javascript/parallax.js',
	'resources/assets/front/javascript/jquery.magnific-popup.min.js',
	'resources/assets/front/javascript/progressive-image.min.js',
	'resources/assets/front/javascript/raphael-min.js',
	'resources/assets/front/javascript/main.js',
	'resources/assets/front/javascript/iview.js'
], 'public/js/front.js');


mix.copy('resources/assets/front/icon','public/icon');
mix.copy('resources/assets/front/images','public/img');
mix.copy('resources/assets/front/fonts','public/fonts');
mix.copy('resources/assets/front/javascript/sliderBackground.js','public/js');