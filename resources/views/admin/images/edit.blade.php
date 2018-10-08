@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Изменить картинку в коллекции
        <small>приятные слова..</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
    {!! Form::open(['route' => ['images.update', $image->id], 'method' => 'put']) !!}
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Изменяем картинку</h3>
        </div>
      @include('admin.errors')          
        <div class="box-body">
          <div class="col-md-6">
            <div class="form-group">
              <label for="exampleInputEmail1">Название</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title" value="{{$image->title}}">
            </div>
            
            <div class="form-group">
              <label>Категория</label>
                {{Form::select('category_id', $categories, $image->category->id, ['class' => 'form-control select2', 'style' => 'width: 100%;', 'placeholder' => 'Выберите категорию'])}}
            </div>
            <div class="form-group">
              <label>Теги</label>
              {{Form::select('tag[]', $tags, $selectedTags, ['class' => 'form-control select2', 'style' => 'width: 100%;', 'multiple' => 'multiple', 'data-placeholder' => 'Выберите теги'])}}
            </div>

            <!-- checkbox -->
            <div class="form-group">
              <label>
                {{Form::checkbox('status', '1', !$image->status, ['class' => 'minimal'])}}
              </label>
              <label>
                Черновик
              </label>
            </div>

            <div class="form-group">
              <label for="exampleInputFile">Картинка</label>
              <input type="hidden" id="image_field" name="image">
              <script type="text/javascript" src="/js/imageResizer.js"></script>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-10 image-preview col-md-offset-1">
                    <a class="btn btn-success btn-xs" onclick="javascript:addpicture(this, {'nosquare': true, 'sizew':1024, 'img_element_id':'uploaded_image', 'field_element_id':'image_field'});">Загрузить</a>
                    <img src="{{$image->getImageFile()}}" alt="" class="img-responsive" id="uploaded_image">
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <a href="{{route('images.index')}}" class="btn btn-default">Назад</a>
          <button class="btn btn-warning pull-right">Изменить</button>
        </div>
        <!-- /.box-footer-->
    {!! Form::close() !!}         
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection