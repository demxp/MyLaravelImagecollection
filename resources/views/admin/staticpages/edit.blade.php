@extends('admin.layout')

@section('content')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Изменить статичную страницу
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="box">
        @include('admin.errors')
        {!! Form::open(['route' => ['staticpages.update', $stpage->id], 'method' => 'put']) !!}        
        <div class="box-body">
          <div class="col-md-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Заголовок</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title" value="{{$stpage->title}}">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">URL</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="slug" value="{{$stpage->slug}}">
            </div>            
            <div class="form-group">
              <textarea name="content" style="width: 100%; height: 250px;">
                {{$stpage->content}}
              </textarea>
            </div>                        
        </div>
      </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <a href="{{route('staticpages.index')}}" class="btn btn-default">Назад</a>
          <button class="btn btn-warning pull-right">Изменить</button>
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