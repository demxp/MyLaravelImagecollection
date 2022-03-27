<template>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Добавляем категорию</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Название</label>
                <input type="text" class="form-control" v-model="cat.title">
              </div>
              <div class="form-group">
                <label>Скрытая</label>    
                <label class="switcher">
                  <input v-model="cat.hidden" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>              
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indexcategories', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="addcategory">Добавить</button>
        </div>
      </div>
</template>

<script>
    export default {
      props: {
        categoryId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      data(){
        return{
          cat: {
            title: null,
            hidden: true
          }
        }
      },
      mounted(){

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
        addcategory(){
          if(this.cat.title === null || this.cat.title.length < 3){
            alert("Надо написать название категории! Минимум 3 символа.");
            return false;
          }      
          let url = '/api/v1/categories';
          this.ajaxfun(url, 'post', {
            title: this.cat.title,
            hidden: (this.cat.hidden) ? 1 : 0,
          }, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'indexcategories', 'id': null});
              return true;
            }
            alert("Упс... Какая-то ошибка...");
          });       
        }
      }    
    }
</script>