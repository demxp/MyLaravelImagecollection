@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Категории
      </h1>
    </section>

    <!-- Main content -->
    <section class="content" id="vueapp">
      <categories-index v-if="checkMode('index')"></categories-index>
      <categories-edit v-if="checkMode('edit')"></categories-edit>
    </section>
@include('admin.categories.index-component')
@include('admin.categories.edit-component')

<script type="text/javascript">
const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'index',
        'edit'
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
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
@endsection
