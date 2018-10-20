<style>
.load_overlay {
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: white;
    opacity: 0.9;
    position: absolute;
    top: 0px;
    left: 0px;
}

.load_overlay .load_indicator {
    width: 70px;
    height: 70px;
    clear: both;
    text-align: center;
    margin: 0px auto;
}

div.img_container {
    position: relative;
}

div#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -35px;
}
</style>

<script type="text/x-template" id="picture-loader">
  <div class="form-group">
    <div class="row">
      <div class="col-md-10 user-avatar col-md-offset-1">
        <a class="btn btn-success btn-xs" @click="process">Загрузить</a>
        <div class="img_container">
          <div v-if="load_indicator" class="load_overlay">
            <div id="floater"></div>
            <div class="load_indicator">
              <img src="/img/loading.gif">
            </div>
          </div>
          <img :src="img.avatar" class="img-circle">
        </div>
        <input type="hidden" :value="img.encoded">
      </div>
    </div>
  </div>  
</script> 
<script type="text/javascript">
Vue.component('picture-loader', {
  props: {
    nosquare: {
      type: Boolean,
      required: false,      
      default: false
    },
    noresize: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,      
      default: 0
    },
    sizew: {
      type: Number,
      required: false,      
      default: 0
    },
    avatar: {
      type: String,
      required: false,      
      default: "/img/no_avatar.jpg"      
    }
  },
  template: '#picture-loader',
  data(){
    return {
      img: {
        params: {},
        encoded: "",
        avatar: ""
      },
      load_indicator: false
    }
  },
  mounted(){
    this.checkProps();
  },
  watch: {
    'img.encoded': function (value) {
      // fire event
      this.$emit('imgselected', value)
    },
    avatar: function(value){
      // set avatar
      this.img.avatar = this.avatar;
    }
  },
  methods:{
    checkProps(){
      this.param = (function(p){
        return {
          'noresize': !!p.noresize,
          'nosquare': !!p.nosquare,
          'size': (!!p.size && p.size > 0) ? p.size : 0,
          'sizew': (!!p.sizew && p.sizew > 0) ? p.sizew : 0
        };
      })(this)

      if((this.param.size == 0 && !this.param.noresize && !this.param.nosquare) || (!this.param.noresize && this.param.nosquare && this.param.sizew == 0)){
        alert("INCORRECT IMGRESIZER PARAMS");
        console.log("INCORRECT IMGRESIZER PARAMS", '\r', param);
        throw("INCORRECT IMGRESIZER PARAMS");
      }
      this.img.avatar = this.avatar;
    },
    init(){
      return new Promise(function(resolve, reject) {
        var fileselect = document.createElement('input');
        fileselect.type = 'file';
        fileselect.onchange = function(){
          var selected = this.files[0];
            if (!selected.type.match('image.*')) {
                return reject({
                  text: "Можно загружать только изображения!",
                  errorcode: "Upload no image file"
                });             
            }
              return resolve(URL.createObjectURL(selected));
          };
          var event = new MouseEvent("click");
          fileselect.dispatchEvent(event);
      })
    },
    imageLoader(src) {
      return new Promise(function(resolve, reject){
        var img = document.createElement("img");
        img.onload = function() {
          return resolve(img);
        };
        img.onerror = function(e) {
          return reject({
                text: "Ошибка загрузки",
                errorcode: e
              });
        };
        img.src = src;        
      })
    },
    cropToSquare(img){
      var left, top, side;
      if(img.height > img.width){
        left = 0;
        top = (img.height - img.width)/2;
        side = img.width;
      }else if(img.height < img.width){
        left = (img.width - img.height)/2;
        top = 0;    
        side = img.height;    
      }else{
        left = 0;
        top = 0;
        side = img.width;
      }
        var canvas = document.createElement('canvas');
        canvas.width = side;
        canvas.height = side;
        canvas.getContext('2d').drawImage(img, left, top, img.width, img.height, 0, 0, img.width, img.height);
        img.src = 'about:blank';
        img.width = 1;
        img.height = 1;
        img = canvas;       
        return {
          img: img,
          side: side
        };
    },
    convertToCanvas(img){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        img.src = 'about:blank';
        img.width = 1;
        img.height = 1;
        img = canvas;       
        return img;
    },   
    resize(img, w, h) {
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          var steps = Math.ceil(Math.log(img.width / w) / Math.LN2);
          var sW = w * Math.pow(2, steps - 1);
          var sH = ((!!h) ? h : w) * Math.pow(2, steps - 1);
          var x = 2;
          function run() {
            if ( ! (steps--)) {
              return resolve(img);
            }
            setTimeout(function() {
              var canvas = document.createElement('canvas');
              canvas.width = sW;
              canvas.height = sH;
              canvas.getContext('2d').drawImage(img, 0, 0, sW, sH);
              img.src = 'about:blank';
              img.width = 1;
              img.height = 1;
              img = canvas;
              sW = Math.round(sW / x);
              sH = Math.round(sH / x);
              run();
            }, 0);
          }
          run();
        }, 0);
      })
    },
    process(){
      this.init().then((src) => {
        return this.imageLoader(src)
      }).then((img) => {
        this.load_indicator = true;        
        return img;
      }).then((img) => {
        URL.revokeObjectURL(img.src);       
        if(this.param.nosquare && this.param.noresize){
          return this.convertToCanvas(img);
        }
        if(this.param.nosquare && this.param.sizew > 0){
          if(this.param.sizew >= img.width){
            return this.convertToCanvas(img);
          }
          var sizeh = Math.round(this.param.sizew * img.height / img.width);
            return this.resize(img, this.param.sizew, sizeh);
        }
        if(this.param.noresize){
          return (this.cropToSquare(img)).img;
        }       
        let cropped = this.cropToSquare(img);
        if(this.param.size >= cropped.img.width){
          return cropped.img;
        }       
        return this.resize(cropped.img, this.param.size);
      }).then((img) => {
        this.img.avatar = img.toDataURL("image/png");
        this.img.encoded = img.toDataURL("image/png");
        this.load_indicator = false;
      }).catch(function(error){
        this.load_indicator = false;
        if(!!error.text){
          alert(error.text);
          console.error(error.errorcode);
        }else{
          alert(error.message);
          console.log(error);         
        }
      })      
    },
  },
});  
</script> 
<script type="text/x-template" id="users-edit">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title" v-text="mode.box_title"></h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Имя</label>
                <input type="text" class="form-control" v-model="user.name">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="text" class="form-control" v-model="user.email">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Пароль</label>
                <input type="password" class="form-control" v-model="user.password">
              </div>
              <div class="form-group">
                <label for="exampleInputFile">Аватар</label>
                <picture-loader :size="220" @imgselected="user.encoded=$event" :avatar="user.avatarimage"></picture-loader>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</a>
          <button class="btn pull-right" :class="{'btn-success':mode.submit_style_success, 'btn-warning':mode.submit_style_warning}" @click="edituser" v-text="mode.submit_text"></button>
        </div>
      </div>
</script> 
<script type="text/javascript">
Vue.component('users-edit', {
  props: {
    userId: {
      type: Number,
      required: false,      
      default: null
    }
  },
  template: '#users-edit',
  data(){
    return{
      user: {
        id: null,
        name: null,
        email: null,
        password: null,
        avatarimage: "/img/no_avatar.jpg",
        encoded: null
      },
      mode:{
        box_title: "Добавляем пользователя",
        submit_text: "Добавить",
        submit_style_success: true,
        submit_style_warning: false
      }
    }
  },
  mounted(){
    if(this.userId !== null){
      this.mode = {
        box_title: "Изменяем пользователя",
        submit_text: "Изменить",
        submit_style_success: false,
        submit_style_warning: true
      };
      let url = '/api/v1/users/' + this.userId;
      this.ajaxfun(url, 'get', null, (req) => {
        for(let i in req){
          this.user[i] = req[i];
        }
      });       
    }
  },
  methods:{
    ajaxfun(url, method, body=null, callback){
      fetch(url, {
        method: method,
        headers: {  
              "Content-type": "application/json; charset=UTF-8",
              'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
        },
        body: (body !== null) ? JSON.stringify(body) : null
      }).then(response => {
          return response.json();
      }).then(req => {
          return callback(req);
      }).catch(e => {
          console.log(e);
      });         
    },
    edituser(){
      if(this.user.name === null || this.user.name.length < 3){
        alert("Надо написать имя пользователя!");
        return false;
      }      
      if(this.user.email === null || this.user.email.length < 3){
        alert("Надо написать Email пользователя!");
        return false;
      }            
      if((this.user.id === null) && (this.user.password === null || this.user.password.length < 3)){
        alert("Надо написать пароль пользователя!");
        return false;
      }

      let url = '/api/v1/users';
      let method = 'post';
      let request_data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        avatar: this.user.encoded
      };

      if(this.user.id !== null){
        url += '/' + this.user.id;
        method = 'put';
        request_data.id = this.user.id;
      }
      
      this.ajaxfun(url, method, request_data, (req) => {
        if(req.status == 'ok'){
          this.$parent.$emit('switch-mode', {'mode': 'index', 'id': null});
          return true;
        }
        customAlert(req);
      });       
    }
  }    
})
</script>