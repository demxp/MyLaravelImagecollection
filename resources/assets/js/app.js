window.Vue = require('vue');

import swal from 'sweetalert'

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
    } else {
      al("Неизвестная ошибка!");
    }
    console.log(resp);
    return;
  };
})(window);

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
Vue.component('UsersRules', require('./components/UsersRules.vue'));
Vue.component('ImagesIndex', require('./components/ImagesIndex.vue'));
Vue.component('ImagesUpload', require('./components/ImagesEdit.vue'));
Vue.component('PagesIndex', require('./components/PagesIndex.vue'));
Vue.component('PagesEdit', require('./components/PagesEdit.vue'));

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
        'editusers',
        'userrules',
        'indexpages',
        'editpages'
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