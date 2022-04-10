window.Vue = require('vue');

import swal from 'sweetalert'
import $ from 'jquery';
 
global.jQuery = $;
global.$ = $;

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
    } else if (!!resp) {
      al("Неизвестная ошибка!");
      console.log(resp);
    }
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
  window.ajaxfun = function(url, method, body=null, callback){
    fetch(url, {
      method: method,
      headers: {  
            "Content-type": "application/json; charset=UTF-8",
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
      },
      body: (body !== null) ? JSON.stringify(body) : null
    }).then(response => {
      if(response.status != 200 && response.status != 201){
        throw {name: 'StatusError', message: response};
      }
      return response.json();
    }).then(req => {
        if(!!req) return callback(req);
    }).catch(e => {
      if(e.name == 'StatusError'){
        e.message.json().then((json) => {
          callback(json);
          customAlert(json);
        })
      }else if(e.name == 'SyntaxError'){
        customAlert({text: 'Некорректный ответ сервера'});
        console.log(e);
      }else{
        customAlert({text: 'Непонятная ошибка'});
        console.log(e);
      }
    });         
  };
  window.localCache = {
    data: {},
    get: function (url, callback){
      if(this.data[url] && !this.data[url].wait){
        return callback(this.data[url].data);
      }
      if(!this.data[url]){
        this.data[url] = {
          wait: true,
          started: false,
          cbArray: [],
          data: null
        };
      }
      if(this.data[url].wait){
        this.data[url].cbArray.push(callback);
      }
      if(!this.data[url].started){
        this.data[url].started = true;
        let _this = this;
        this.request(url, function(json){
          _this.data[url].data = json;
          _this.data[url].wait = false;
          _this.data[url].cbArray.map((item, i) => {
            item(json);
          });
          _this.data[url].cbArray = [];
        });
      }      
    },
    request: function (url, callback) {
      console.log('Request in cache for url' + url);
      new Promise(function(resolve, reject) {
        fetch(url, {method: 'get'}).then(response => {
            if(response.status != 200){
                console.log('Error from LocalCache - Request');
                return reject();
            };
            return response.json();
        }).then(json => {
          resolve(json);
          callback(json);
        })
      });
    }    
  }; 
})(window);

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