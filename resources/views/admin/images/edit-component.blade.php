<script type="text/x-template" id="images-edit">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Добавляем картинку</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Название</label>
                <input type="text" class="form-control" v-model="img.title">
              </div>
              <div class="form-group">
                <label>Категория</label>
                <select2 :options="cats" v-model="img.category_id" style="width: 100%;"></select2>
              </div>
              <div class="form-group">
                <label>Черновик</label>    
                <label class="switcher">
                  <input v-model="img.status" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>
              <div class="form-group">
                <label for="exampleInputFile">Картинка</label>
                <picture-loader :sizew="2000" nosquare picture="PLImageImage" @imgselected="img.encoded=$event" :image="img.encoded"></picture-loader>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="addimage">Добавить</button>
        </div>
      </div>
</script> 
<script type="text/javascript">
Vue.component('images-upload', {
  props: {
    imageId: {
      type: Number,
      required: false,      
      default: null
    }
  },
  template: '#images-edit',
  data(){
    return{
      cats: [],
      img: {
        title: null,
        category_id: 0,
        status: false,
        encoded: "/img/no_picture.jpg"
      }
    }
  },
  mounted(){
    this.ajaxfun('/api/v1/categories', 'get', null, this.fillCategories);
  },
  methods:{
    ajaxfun(url, method, body=null, callback){
      fetch(url, {
        method: method,
        headers: {  
              "Content-type": "application/json; charset=UTF-8",
              'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
        },
        body: (body !== null) ? JSON.stringify(body) : null
      }).then(response => {
          return response.json();
      }).then(req => {
          return callback(req);
      }).catch(e => {
          console.log(e);
      });         
    },
    fillCategories(data){
      this.cats.push({
        titleimage: 0,
        text: "Нет категории",
        id: 0
      });      
      data.map((item, i) => {
        this.cats.push({
          titleimage: item.titleimage,
          text: item.title,
          id: item.id
        });
      });
    },
    addimage(){
      if(this.img.encoded === null){
        alert("Надо выбрать картинку!");
        return false;
      }
      if(this.img.title === null || this.img.title.length < 3){
        alert("Надо написать название!");
        return false;
      }      
      let url = '/api/v1/images';
      this.ajaxfun(url, 'post', {
        title: this.img.title,
        category_id: (this.img.category_id === null || this.img.category_id == 0) ? null : this.img.category_id,
        status: (this.img.status) ? null : 'hide',
        image: this.img.encoded
      }, (req) => {
        if(req.status == 'ok'){
          this.$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null});
          return true;
        }
        alert("Упс... Какая-то ошибка...");
      });       
    }
  }    
})
</script>