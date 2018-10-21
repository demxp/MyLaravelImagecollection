<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>AdminLTE 2 | Blank Page</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <link rel="stylesheet" type="text/css" href="/css/admin.css" />
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.4.min.js"></script>
  <script type="text/javascript" src="/js/admin.js?sdfsdf"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
<style>
  table.table form{
    display:inline-block;
  }

  button.delete{
    background: transparent;
    border: none;
    padding: 0px;
  }

  .user-avatar{
    text-align: center;
    max-width: 120px;
  }

  .user-avatar img {
      width: 100%;
      max-width: 70px;
      height: auto;
  }  

  .user-avatar a{
    display: inline-block;
    margin: 5px auto;
  }

  .image-preview a{
    margin: 10px auto;
    display: block;
  }

  .image-preview img {
      width: 100%;
      height: auto;
  }  

/*Чекбокс - вынести в CSS*/
/* switcher */
.switcher{
    display: block;
    margin: 5px auto;
    width: 50px;
    height: 26px;
}
.switcher input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;
}
.switcher__text {
  position: relative;
  padding: 0 0 0 60px;
  cursor: pointer;
}
.switcher__text:before {
  content: '';
  position: absolute;
  top: -4px;
  left: 0;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background: #CDD1DA;
  transition: .2s;
}
.switcher__text:after {
  content: '';
  position: absolute;
  top: -2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 10px;
  background: #FFF;
  transition: .2s;
}
.switcher input:checked + .switcher__text:before {
  background: #49d475;
}
.switcher input:checked + .switcher__text:after {
  left: 26px;
}

/* end switcher */
.setcattitle {
    text-align: center;
}

.setcattitle span {
    border: 1px solid #0acc29;
    color: #2c68f5;
    padding: 3px;
    border-radius: 3px;
    margin: 5px auto;
    display: none;
}

.setcattitle button {
    margin: 5px auto;
}

.setcattitle.selected button{
    display: none;
}

.setcattitle.selected span{
    display: inline-block;
}

tr.tr__green td{
    background-color: #9cff9c !important;
    transition: .3s;
}

tr.tr__red td{
    background-color: #ff9c9c !important;
    transition: .3s;
}
</style>
</head>
<body class="hold-transition skin-blue sidebar-mini">

<script type="text/javascript">
  (function(window){
    let al = alert;
    let errors = {
      'IncorrectInputData':{
        'parseFunc':(resp) => {
          al("Некорректные данные");
        }
      },
      'ValidateError':{
        'parseFunc':(resp) => {
          al(resp.errors.reduce((acc, item) => {
            return acc += item + '\n';
          }, ""));
        }
      },
      'NotEnoughRights':{
        'parseFunc':(resp) => {
          al("Не хватает прав для выполнения");
        }
      }
    };
    window.customAlert = (resp) => {
      if(!!errors[resp.message]){
        errors[resp.message].parseFunc(resp);
      }else{
        al("Неизвестная ошибка!");
      }
      console.log(resp);
      return;
    };
  })(window);
</script>

<style>
#picture-loader-image-images .load_overlay {
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: white;
    opacity: 0.9;
    position: absolute;
    top: 0px;
    left: 0px;
}

#picture-loader-image-images .load_overlay .load_indicator {
    width: 70px;
    height: 70px;
    clear: both;
    text-align: center;
    margin: 0px auto;
}

#picture-loader-image-images div.img_container {
    position: relative;
}

#picture-loader-image-images div#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -35px;
}
</style>

<script type="text/x-template" id="picture-loader-image-images">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 image-preview">
        <a class="btn btn-success btn-xs" @click="$emit('processUpload')">Загрузить</a>
        <div class="img_container">
          <div v-if="load_indicator" class="load_overlay">
            <div id="floater"></div>
            <div class="load_indicator">
              <img src="/img/loading.gif">
            </div>
          </div>
          <img :src="proxyValue" class="img-responsive">
        </div>
      </div>
    </div>
</script>

<script type="text/javascript">
Vue.component('PLImageImage', {
  props: {
    image: {
      type: String,
      required: false,      
      default: "/img/no_picture.jpg"      
    },
    load_indicator: {
      type: Boolean,
      required: false,      
      default: false
    }
  },
  template: '#picture-loader-image-images'
});
</script>

<style>
#picture-loader-image-users .load_overlay {
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: white;
    opacity: 0.9;
    position: absolute;
    top: 0px;
    left: 0px;
}

#picture-loader-image-users .load_overlay .load_indicator {
    width: 70px;
    height: 70px;
    clear: both;
    text-align: center;
    margin: 0px auto;
}

#picture-loader-image-users div.img_container {
    position: relative;
}

#picture-loader-image-users div#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -35px;
}
</style>

<script type="text/x-template" id="picture-loader-image-users">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 user-avatar">
        <a class="btn btn-success btn-xs" @click="$emit('processUpload')">Загрузить</a>
          <div class="img_container">
            <div v-if="load_indicator" class="load_overlay">
              <div id="floater"></div>
              <div class="load_indicator">
                <img src="/img/loading.gif">
              </div>
            </div>
            <img :src="image" class="img-circle">
          </div>  
      </div>
    </div>
</script>

<script type="text/javascript">
Vue.component('PLImageAvatar', {
  props: {
    image: {
      type: String,
      required: false,      
      default: "/img/no_avatar.jpg"      
    },
    load_indicator: {
      type: Boolean,
      required: false,      
      default: false
    }
  },
  template: '#picture-loader-image-users'
});
</script>


<script type="text/x-template" id="picture-loader">
  <div class="form-group">
    <input type="hidden" :value="img.encoded">
    <component :is="picture" :image="img.image" :load_indicator="load_indicator" @processUpload="process"></component>
  </div>  
</script> 
<script type="text/javascript">
Vue.component('PictureLoader', {
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
    image: {
      type: String,
      required: false
    },
    picture: ""
  },
  template: '#picture-loader',
  data(){
    return {
      img: {
        params: {},
        encoded: "",
        image: ""
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
    image: function(value){
      // set avatar
      this.img.image = this.image;
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
      this.img.image = this.image;
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
        this.img.image = img.toDataURL("image/png");
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

<script type="text/javascript">
Vue.component('select2', {
  props: ['options', 'value'],
  template: '<select><slot></slot></select>',
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options, placeholder: "Нет категории" })
      .val(this.value)
      .trigger('change')
      .on('select2:select', function (e) {
        vm.$emit('input', this.value)
      });      
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el)
        .val(value)
        .trigger('change')
    },
    options: function (options) {
      // update options
      $(this.$el).empty().select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).select2('destroy')
  }
});
</script> 

<!-- Site wrapper -->
<div class="wrapper" id="vueapp">
  @include('admin.header')
  <!-- Left side column. contains the sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="{{Auth::user()->getAvatar()}}" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{Auth::user()->name}}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      @include('admin._sidebar')
    </section>
    <!-- /.sidebar -->
  </aside>
  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Привет! Это админка. Выберите раздел слева...
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <images-index v-if="checkMode('indeximages')"></images-index>
      <images-upload v-if="checkMode('uploadimages')"></images-upload>    
      <categories-index v-if="checkMode('indexcategories')"></categories-index>
      <categories-edit v-if="checkMode('editcategories')"></categories-edit>
      <users-index v-if="checkMode('indexusers')"></users-index>
      <users-edit v-if="checkMode('editusers')" :user-id="id"></users-edit>      
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.7
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com/">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>
</div>
@include('admin.images.index-component')
@include('admin.images.edit-component')
@include('admin.categories.index-component')
@include('admin.categories.edit-component')
@include('admin.users.index-component')
@include('admin.users.edit-component')

<script type="text/javascript">
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
})
</script>
<!-- ./wrapper -->
</body>
</html>