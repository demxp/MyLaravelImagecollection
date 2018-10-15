@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Статические страницы
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
            <div class="box-body">
              <div class="form-group">
                <a href="{{route('staticpages.create')}}" class="btn btn-success">Добавить</a>
              </div>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Заголовок</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                @foreach($stpages as $page)
                  <tr>
                    <td>{{$page->id}}</td>
                    <td>{{$page->title}}</td>
                    <td>
                    @if(\Auth::user()->is_admin == 1)
                      <a href="{{route('staticpages.edit', $page->id)}}" class="fa fa-pencil"></a> 
                      {{Form::open(['route' => ['staticpages.destroy', $page->id], 'method' => 'delete'])}}
                        <button type="submit" class="delete" onclick="return confirm('Вы уверены?');">
                          <a class="fa fa-remove"></a>
                        </button>
                      {{Form::close()}}
                    @endif
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
