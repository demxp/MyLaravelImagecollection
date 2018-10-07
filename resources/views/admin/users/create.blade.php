@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Добавить пользователя
        <small>приятные слова..</small>
      </h1>
    </section>

    {!! Form::open(['route' => 'users.store']) !!}
    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Добавляем пользователя</h3>
        </div>
    	@include('admin.errors')        
        <div class="box-body">
          <div class="col-md-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Имя</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="name" value="{{old('name')}}">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="email" value="{{old('email')}}">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Пароль</label>
              <input type="password" class="form-control" id="exampleInputEmail1" placeholder="" name="password">
            </div>
            <div class="form-group">
              <label for="exampleInputFile">Аватар</label>
              <input type="hidden" id="avatar_image_field" name="avatar">
              <script type="text/javascript" src="/js/imageResizer.js"></script>
              <div class="form-group">
              	<div class="row">
              		<div class="col-md-4 user-avatar col-md-offset-4">
						<a class="btn btn-success btn-xs" onclick="javascript:addpicture(this, 220);">Загрузить</a>
						<img src="/img/no_avatar.jpg" alt="" class="img-circle" id="avatar_image">
              		</div>
              	</div>
              </div>
            </div>
        </div>
      </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <a href="{{route('users.index')}}" class="btn btn-default">Назад</a>
          <button class="btn btn-success pull-right">Добавить</button>
        </div>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->
    </section>
    {!! Form::close() !!}    
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection
