@extends('admin.layout')

@section('content')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Добавить статичную страницу
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="box">
        @include('admin.errors')
        {!! Form::open(['route' => 'staticpages.store']) !!}        
        <div class="box-body">
          <div class="col-md-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Заголовок</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">URL</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="slug">
            </div>            
            <div class="form-group">
              <textarea name="content" style="width: 100%; height: 250px;"></textarea>
            </div>                        
        </div>
      </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <a href="{{route('staticpages.index')}}" class="btn btn-default">Назад</a>
          <button class="btn btn-success pull-right">Добавить</button>
        </div>
        {!! Form::close() !!}        
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


@endsection