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