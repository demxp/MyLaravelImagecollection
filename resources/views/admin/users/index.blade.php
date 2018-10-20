@extends('admin.layout')

@section('content')
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>Пользователи</h1>
    </section>
    <!-- Main content -->
    <section class="content" id="vueapp">
      <users-index v-if="checkMode('index')"></users-index>
      <users-edit v-if="checkMode('edit')" :user-id="userid"></users-edit>
    </section>
  </div>


@include('admin.users.index-component')
@include('admin.users.edit-component')

<script type="text/javascript">
const app = new Vue({
  el: '#vueapp',
  data(){
    return{
      modes:[
        'index',
        'edit'
      ],
      current: 'index',
      userid: null
    }
  },
  mounted(){
    this.$on('switch-mode', this.setMode);
  },
  methods:{
    setMode(event){
      if(!!this.modes.find((el) => el === event.mode)){
        this.userid = event.id;
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