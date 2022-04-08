const webpack = require('webpack');
let mix = require('laravel-mix');

mix.webpackConfig({
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us|ru/)
  ]
})


/*
 |--------------------------------------------------------------------------
 | Custom Mix setup
 |--------------------------------------------------------------------------
 |
 */

require('laravel-mix-merge-manifest');

if (process.env.section) {
  require(`${__dirname}/webpack.mix.${process.env.section}.js`);
}