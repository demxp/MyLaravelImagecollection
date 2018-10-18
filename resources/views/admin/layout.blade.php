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
</style>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
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
@yield('content')
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.7
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com/">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>
</div>
<!-- ./wrapper -->

<script type="text/javascript" src="/js/admin.js?sdfsdf"></script>
<script type="text/javascript" src="/js/oper.js?sdfsdf"></script>
<script type="text/javascript">

</script>
@if(session('status'))
  @switch(session('status'))
    @case('NotEnoughRights')
      <script type="text/javascript">alert("Не хватает прав для данного действия!");</script>
    @break
    @default
      <script type="text/javascript">alert("{{session('status')}}");</script>
    @break
  @endswitch
@endif 
</body>
</html>