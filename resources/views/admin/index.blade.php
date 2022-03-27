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
      <users-rules v-if="checkMode('userrules')" :user-id="id"></users-rules>
      <pages-index v-if="checkMode('indexpages')"></pages-index>
      <pages-edit v-if="checkMode('editpages')" :page-id="id"></pages-edit>      
      <posts-index v-if="checkMode('indexposts')"></posts-index>
      <posts-edit v-if="checkMode('editposts')" :post-id="id"></posts-edit>
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