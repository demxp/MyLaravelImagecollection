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
    <section class="content" id="vueapp">
      <images-index v-if="checkMode('index')"></images-index>
      <images-upload v-if="checkMode('upload')"></images-upload>
    </section>
  </div>


@include('admin.images.index-component')
@include('admin.images.edit-component')

<script type="text/javascript">
const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'index',
        'upload'
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
