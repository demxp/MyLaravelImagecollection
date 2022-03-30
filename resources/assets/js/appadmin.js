window.Vue = require('vue');

import swal from 'sweetalert'
import moment from 'moment';

/* Скрипт кастомного Alert */

(function(window) {
  let al = ((swal) => {
    return function(text){
      swal("Oops!", text, "error");
    }; 
  })(swal);
  let errors = {
    'IncorrectInputData': {
      'parseFunc': (resp) => {
        al("Некорректные данные");
      }
    },
    'ValidateError': {
      'parseFunc': (resp) => {
        al(resp.errors.reduce((acc, item) => {
          return acc += item + '\n';
        }, ""));
      }
    },
    'NotEnoughRights': {
      'parseFunc': (resp) => {
        al("Не хватает прав для выполнения");
      }
    }
  };
  window.customAlert = (resp) => {
    if (!!errors[resp.message]) {
      errors[resp.message].parseFunc(resp);
    } else if (!!resp.text) {
      al(resp.text);
    } else if (!!resp.message) {
      al(resp.message);      
    } else {
      al("Неизвестная ошибка!");
    }
    console.log(resp);
    return;
  };
  window.moment = require('moment');
  window.moment.locale('ru');
  window.cyrb53 = function(str, seed = 0) {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
          ch = str.charCodeAt(i);
          h1 = Math.imul(h1 ^ ch, 2654435761);
          h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
      h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
      return 4294967296 * (2097151 & h2) + (h1>>>0);
  };  
})(window);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('PictureLoader', require('./components/admin/PictureLoader.vue'));
Vue.component('Select2', require('./components/admin/Select2.vue'));
Vue.component('PLImageAvatar', require('./components/admin/PLImageAvatar.vue'));
Vue.component('PLImageImage', require('./components/admin/PLImageImage.vue'));

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
  },
});