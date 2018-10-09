@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Blank page
        <small>it all starts here</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li class="active">Blank page</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
            <div class="box-header">
              <h3 class="box-title">Листинг сущности</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="form-group">
                <a href="{{route('images.create')}}" class="btn btn-success">Добавить</a>
              </div>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Теги</th>
                  <th>Картинка</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                @foreach($images as $image)
                <tr>
                  <td>{{$image->id}}</td>
                  <td>{{$image->title}}</td>
                  <td>{{$image->getCategoryTitle()}}</td>
                  <td>{{$image->getTags()}}</td>
                  <td>
                    <img src="{{$image->getThumbnail()}}" alt="" width="100">
                  </td>
                  <td><a href="{{route('images.edit', $image->id)}}" class="fa fa-pencil"></a>
                    {{Form::open(['route' => ['images.destroy', $image->id], 'method' => 'delete'])}}
                      <button type="submit" class="delete" onclick="return confirm('Вы уверены?');">
                        <a class="fa fa-remove"></a>
                      </button>
                    {{Form::close()}}
                  </td>
                </tr>
                @endforeach                
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection
