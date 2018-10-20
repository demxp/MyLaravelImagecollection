@extends('admin.layout')

@section('content')
  <div class="content-wrapper" id="vueapp">
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
      <users-edit v-if="checkMode('editusers')" :user-id="userid"></users-edit>      
    </section>
    <!-- /.content -->
  </div>

@include('admin.images.index-component')
@include('admin.images.edit-component')
@include('admin.categories.index-component')
@include('admin.categories.edit-component')
@include('admin.users.index-component')
@include('admin.users.edit-component')

<script type="text/javascript">
const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'indeximages',
        'uploadimages',
        'indexcategories',
        'editcategories',
        'indexusers',
        'editusers'
      ],
      current: 'index' 
    }
  },
  mounted(){
    this.$on('switch-mode', this.setMode);
  },
  methods:{
    setMode(event){
      if(!!this.modes.find((el) => el === event.mode)){
        this.current = event.mode;
      }
    },
    checkMode(mode){
      return this.current == mode;
    }
  },
})
</script>

@endsection