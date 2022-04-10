export function WindowInstallCustom() {
  window.customAlert = (resp) => {
    let text = '';
    let mode = false;
    let errors = {
      'IncorrectInputData': ((resp) => "Некорректные данные"),
      'NotEnoughRights': ((resp) => "Не хватает прав для выполнения"),      
      'ValidateError': ((resp) => {
        return resp.errors.reduce((acc, item) => {
          return acc += item + '\n';
        }, "");
      })
    };

    if (!!errors[resp.message]) {
      text = errors[resp.message](resp);
    } else if (!!resp.text) {
      text = resp.text;
      mode = ('mode' in resp) ? resp.mode : false;
    } else if (!!resp.message) {
      text = resp.message;
    } else if (!!resp) {
      text = "Неизвестная ошибка!";
      console.log(resp);
    }

    if(mode){
      swal('', text, mode);
    }else{
      swal("Oops!", text, "error");
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
        }).catch((e) => {throw e});
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
}