<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="store.state = !store.state">Добавить</a>
      </div>
      <div v-if="store.state">
        <div class="form-group">
          <label for="exampleInputEmail1">Название</label>
          <input type="text" class="form-control" v-model="store.title" @keydown.13.prevent="saveTag()">
        </div>
      </div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody v-if="tags.length == 0">
          <tr>
            <td colspan=2><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>
        <tbody>
          <tr v-for="tag in tags" :class="{'tr__green':tag.success, 'tr__red':tag.danger}">
            <td>
              <span contenteditable="true" @keydown.13.prevent="createChange(tag,'title',$event,'text')" v-text="tag.title"></span>
            </td>
            <td>
              <button class="btn btn-xs btn-danger btn-block" @click="deleteElem(tag.id)">Удалить</button>
            </td>
          </tr>                 
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    import { MethodsMixin } from './../mixins/methods.mixin.js';

    export default {
      mixins: [MethodsMixin],
      apiPath: 'tag',
      mainArrayName: 'tags',      
      data(){
        return{
          tags: [],
          store: {
            title: '',
            state: false
          }
        }
      },
      watch: {
        'store.state': function (value) {
          if(!value){
            this.store.title = '';
          }
        }
      },      
      methods:{
        saveTag(){
          if(this.store.title == ''){
            customAlert({text: 'Заполните имя тега'});
            return false;
          }

          ajaxfun(this.$apiLink('tag'), 'post', {
            title: this.store.title
          }, (req) => {
            if(req.status == 'ok'){
              this.store.state = false;
              ajaxfun(this.$apiLink('tag'), 'get', null, this.fillTable);
            }else{
              customAlert(req);
            }            
          });
        }
      }  
    }
</script>

<style scoped>
.savebtn {
  margin: 10px auto;
  display: block;
}
</style>