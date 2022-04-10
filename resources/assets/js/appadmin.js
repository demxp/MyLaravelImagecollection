window.Vue = require('vue');

import swal from 'sweetalert'
import $ from 'jquery';
import { WindowInstallCustom } from './components/window.functions.module.js';
 
global.jQuery = $;
global.$ = $;

WindowInstallCustom();

Vue.prototype.$apiLink = function(mode, id=false){
  let apiVersion = 1;
  let address = '/api/v' + apiVersion + '/?' + ((id) ? '/' + id : '');

  switch(mode){
    case('image'):
    return address.replace('?', 'images');
    break;
    case('category'):
    return address.replace('?', 'categories');
    break;
    case('audio'):
    return address.replace('?', 'audiofiles');
    break;
    case('staticpage'):
    return address.replace('?', 'staticpages');
    break;
    case('post'):
    return address.replace('?', 'posts');
    break;
    case('tag'):
    return address.replace('?', 'tags');
    break;    
    case('user'):
    return address.replace('?', 'users');
    break;        
  }
};

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('CategoriesIndex', require('./components/admin/CategoriesIndex.vue'));
Vue.component('CategoriesEdit', require('./components/admin/CategoriesEdit.vue'));
Vue.component('UsersIndex', require('./components/admin/UsersIndex.vue'));
Vue.component('UsersEdit', require('./components/admin/UsersEdit.vue'));
Vue.component('UsersRules', require('./components/admin/UsersRules.vue'));
Vue.component('ImagesIndex', require('./components/admin/ImagesIndex.vue'));
Vue.component('ImagesUpload', require('./components/admin/ImagesEdit.vue'));
Vue.component('PagesIndex', require('./components/admin/PagesIndex.vue'));
Vue.component('PagesEdit', require('./components/admin/PagesEdit.vue'));
Vue.component('PostsIndex', require('./components/admin/PostsIndex.vue'));
Vue.component('PostsEdit', require('./components/admin/PostsEdit.vue'));
Vue.component('AudiofilesIndex', require('./components/admin/AudiofilesIndex.vue'));
Vue.component('TagsIndex', require('./components/admin/TagsIndex.vue'));

const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'uploadimages',
        'editcategories',
        'editusers',
        'userrules',
        'editpages',
        'editposts'
      ],
      current: 'index',
      id: null 
    }
  },
  mounted(){
    this.$on('switch-mode', this.setMode);
  },
  methods:{
    setMode(event){
      if(!!this.modes.find((el) => el === event.mode)){
        this.current = event.mode;
        if(event.id !== null){
          this.id = event.id;
        }else{
          this.id = null;
        }
      }else{
        this.current = 'index';
        this.id = null;        
      }
    },
    checkMode(mode){
      return this.current == mode;
    }
  } 
});