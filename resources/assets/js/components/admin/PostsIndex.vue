<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editposts', 'id': null})">Добавить</a>
      </div>
      <div style="text-align: right;">
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Публикация</th>
            <th>Комментирование</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody v-if="posts.length == 0">
          <tr>
            <td colspan=6><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>        
        <tbody>
          <tr v-for="post in posts" :class="{'tr__green':post.success, 'tr__red':post.danger}">
            <td><span v-text="post.id"></span></td>
            <td><a :href="post.link" target="_black"><span v-text="post.title"></span></a></td>
            <td>
              <distate-switcher
              :select="post.publication"
              :options="publicMode"
               @change="createChange(post, 'publication', $event, 'native')"
              ></distate-switcher>              
            </td>
            <td>
              <tristate-switcher
              mode="switcher"
              :select="post.commenting"
              @change="createChange(post, 'commenting', $event, 'native')"
              :options="commentMode"
              ></tristate-switcher>
            </td>            
            <td>
              <button class="btn btn-xs btn-info" @click="editPost(post)">Изменить</button>
              <button class="btn btn-xs btn-danger" @click="deletePost(post)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: right;">
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
    </div>
  </div>
</template>

<script>
    import Paginate from './Paginate.vue';

    export default {
      components: {Paginate},
      data(){
        return{
          posts: [],
          current_page: 0,
          last_page: 0
        }
      },
      mounted(){
        this.publicMode = [
            {value: '0', text: 'Закрыто'},
            {value: '1', text: 'Открыто'}            
        ];        
        this.commentMode = [
            {value: '0', text: 'Выключено'},
            {value: '1', text: 'Модерация'},
            {value: '2', text: 'Включено'}
        ];
        ajaxfun(this.$apiLink('post'), 'get', null, this.fillTable)
      },
      watch: {
        'current_page': function (value) {
          ajaxfun(this.$apiLink('post') + '?page=' + value, 'get', null, this.fillTable);
        },
      },
      methods:{
        fillTable(data){
          data.data.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.posts[i]){
              Object.keys(item).map((param) => this.posts[i][param] = item[param]);
            }else{
              this.posts.push(item)
            }
          });
          if(data.data.length < this.posts.length){
            this.posts.splice(data.data.length, this.posts.length - data.data.length);
          }
          this.current_page = data.meta.current_page;
          this.last_page = data.meta.last_page;          
        },
        createChange(model, field, event, valid){
          this.roll = ((model) => {
            let oldState = model[field];
            let _this = this;          
            return function(obj){
              obj[field] = oldState;
              _this.roll = function(){};
            };
          })(model);
          if(valid == 'boolean'){
            model[field] = (event.target.checked) ? 1 : 0;
          }
          if(valid == 'native'){
            model[field] = event;
          }          
          let saveable = {};
          saveable.id = model.id;
          saveable[field] = model[field];
          this.saveModel(saveable, this.createCallback(model));          
        },
        saveModel(model, callback){
          ajaxfun(this.$apiLink('post', model.id), 'put', post, callback);
        },
        createCallback(obj){
          let roll = this.roll;
          return function(req){
            if(req.status == 'ok'){
              obj.success = true;
              setTimeout(() => {obj.success = false;},1000);
            }else{
              customAlert(req);
              obj.danger = true;
              setTimeout(() => {obj.danger = false;},1000);
              roll(obj);
            }
          };
        },
        editPost(post){
          this.$parent.$emit('switch-mode', {'mode': 'editposts', 'id': post.id});      
        },
        deletePost(post){
          if(!confirm("Вы уверены?")){return false;}
          ajaxfun(this.$apiLink('post', post.id), 'delete', {
            id: post.id
          }, (req) => {
            if(req.status == 'ok'){
              this.setPage();
            }else{
              customAlert(req);
            }            
          });
        }
      }  
    }
</script>