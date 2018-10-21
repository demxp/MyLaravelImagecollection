window.Vue = require('vue');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('PictureLoader', require('./components/PictureLoader.vue'));
Vue.component('Select2', require('./components/Select2.vue'));
Vue.component('PLImageAvatar', require('./components/PLImageAvatar.vue'));
Vue.component('PLImageImage', require('./components/PLImageImage.vue'));

Vue.component('CategoriesIndex', require('./components/CategoriesIndex.vue'));
Vue.component('CategoriesEdit', require('./components/CategoriesEdit.vue'));
Vue.component('UsersIndex', require('./components/UsersIndex.vue'));
Vue.component('UsersEdit', require('./components/UsersEdit.vue'));
Vue.component('ImagesIndex', require('./components/ImagesIndex.vue'));
Vue.component('ImagesUpload', require('./components/ImagesEdit.vue'));

const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'indeximages',
        'uploadimages',
        'indexcategories',
        'editcategories',
        'indexusers',
        'editusers'
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
      }
    },
    checkMode(mode){
      return this.current == mode;
    }
  },
});