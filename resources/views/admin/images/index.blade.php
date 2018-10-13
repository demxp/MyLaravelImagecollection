@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Картинки
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="box">
            <div class="box-body">
              <div class="form-group">
                <a href="{{route('images.create')}}" class="btn btn-success">Добавить</a>
              </div>
              <table class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Открытая</th>
                  <th>Категория</th>
                  <th>Картинка</th>
                  <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                @foreach($images as $image)
                <tr data-imid="{{$image->id}}">
                  <td>{{$image->id}}</td>
                  <td><div class="imtitle">{{$image->title}}</div></td>
                  <td>
                      <label class="switcher">
                        @if($image->status == 0)
                          <input type="checkbox" class="toggleimgvisible" name="isvisible" required />
                        @else
                          <input type="checkbox" class="toggleimgvisible" name="isvisible" checked="checked" required />
                        @endif
                          <div class="switcher__text"></div>
                      </label>
                    </div>                    
                  </td>
                  <td>
                    {{Form::select('category_id', $categories, $image->category_id, ['class' => 'form-control select2 selectcat', 'style' => 'width: 100%;', 'placeholder' => 'Выберите категорию'])}}
                      @if($image->category_id != null)
                        @if($image->category->titleimage == $image->id)
                        <div class="setcattitle selected">
                          <button type="button" class="btn btn-info btn-xs">Иконка</button>                      
                          <span>Иконка</span>
                        @else
                        <div class="setcattitle">
                          <button type="button" class="btn btn-info btn-xs">Иконка</button>
                          <span>Иконка</span>
                        @endif
                        </div>
                      @endif
                  </td>
                  <td>  
                    <a href="{{$image->getImageLink()}}" target="_blank">
                    <img src="{{$image->getThumbnail()}}" alt="" width="100">
                    </a>
                  </td>
                  <td class="imgactions">
                  @if(\Auth::user()->is_admin == 1)
                    <a href="{{route('images.edit', $image->id)}}" class="fa fa-pencil"></a>
                    {{Form::open(['route' => ['images.destroy', $image->id], 'method' => 'delete'])}}
                      <button type="submit" class="delete" onclick="return confirm('Вы уверены?');">
                        <a class="fa fa-remove"></a>
                      </button>
                    {{Form::close()}}
                  @else
                    <button type="button" class="btn btn-danger btn-xs delimage">УДАЛИТЬ</button>
                  @endif
                  </td>
                </tr>
                @endforeach                
                </tbody>
              </table>
              <div style="text-align: right;">
                {{$images->links()}}
              </div>
            </div>
            <!-- /.box-body -->
          </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection
