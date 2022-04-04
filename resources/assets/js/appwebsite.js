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
          let error = response.json();
          error.then(data => {
            customAlert(data);
          }).catch(e => {
            customAlert({text: 'Ошибка ответа сервера'});
            console.log(e);
          });
          return;
        }
        return response.json();
    }).then(req => {
        if(!!req) return callback(req);
    }).catch(e => {
      customAlert({text: 'Ошибка исполнения запроса'});
      console.log(e);
    });         
  };
})(window);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('LocalTime', require('./components/front/LocalTime.vue'));
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