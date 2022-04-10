window.Vue = require('vue');

import swal from 'sweetalert'
import $ from 'jquery';
import { WindowInstallCustom } from './components/window.functions.module.js';
 
global.jQuery = $;
global.$ = $;

WindowInstallCustom();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('LocalTime', require('./components/reusable/LocalTime.vue'));
Vue.component('DivEditable', require('./components/reusable/DivEditable.vue'));

Vue.component('BgSlider', require('./components/front/BgSlider.vue'));
Vue.component('AudioPlayer', require('./components/front/AudioPlayer.vue'));
Vue.component('CommentsBlock', require('./components/front/CommentsBlock.vue'));
Vue.component('CommentArticle', require('./components/front/CommentArticle.vue'));

const app = new Vue({
  el: '#vueapp',
  data(){
    return{

    }
  },
  mounted(){

  }
});