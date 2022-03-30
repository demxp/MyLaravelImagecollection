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
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini">

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
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">ГЛАВНОЕ МЕНЮ</li>
        <li><a href="{{route('adminpage', 'users')}}"><i class="fa fa-users"></i> <span>Пользователи</span></a></li>
        <li><a href="{{route('adminpage', 'categories')}}"><i class="fa fa-list-ul"></i> <span>Категории</span></a></li>
        <li><a href="{{route('adminpage', 'images')}}"><i class="fa fa-sticky-note-o"></i> <span>Картинки</span></a></li>
        <li><a href="{{route('adminpage', 'posts')}}"><i class="fa fa-book"></i> <span>Посты блога</span></a></li>
        <li><a href="{{route('adminpage', 'pages')}}"><i class="fa fa-list-ul"></i> <span>Страницы</span></a></li>        
        <li><a href="{{route('adminpage', 'audiofiles')}}"><i class="fa fa-music"></i> <span>Аудиофайлы</span></a></li>        
      </ul>
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
      @if($page == 'images')
        <images-index v-if="checkMode('index')"></images-index>
        <images-upload v-if="checkMode('uploadimages')"></images-upload>    
      @elseif($page == 'categories')
        <categories-index v-if="checkMode('index')"></categories-index>
        <categories-edit v-if="checkMode('editcategories')"></categories-edit>
      @elseif($page == 'users')
        <users-index v-if="checkMode('index')"></users-index>
        <users-edit v-if="checkMode('editusers')" :user-id="id"></users-edit>
        <users-rules v-if="checkMode('userrules')" :user-id="id"></users-rules>        
      @elseif($page == 'pages')
        <pages-index v-if="checkMode('index')"></pages-index>
        <pages-edit v-if="checkMode('editpages')" :page-id="id"></pages-edit>      
      @elseif($page == 'posts')
        <posts-index v-if="checkMode('index')"></posts-index>
        <posts-edit v-if="checkMode('editposts')" :post-id="id"></posts-edit>        
      @elseif($page == 'audiofiles')
        <audiofiles-index v-if="checkMode('index')"></audiofiles-index>
      @endif
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
<!-- ./wrapper -->
<script src="/js/admin.js"></script>
<script src="/js/appadmin.js"></script>
</body>
</html>