<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editposts', 'id': null})">Добавить</a>
      </div>
      <div style="text-align: right;">
        <div class="row pagination">
          <div style="text-align: center;">
            <p>Страница {{ current_page }} из {{ last_page }}</p>
            <div class="input-group" style="max-width: 170px; display: inline-table;">
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page <= 1" @click="firstPage"><<</button>
              </span>            
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page <= 1" @click="prevPage"><</button>
              </span>
              <input type="text" class="form-control input-sm" style="text-align: center;" v-model="current_page" @keyup.13="setPage">
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page === last_page" @click="nextPage">></button>
              </span>      
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page === last_page" @click="lastPage">>></button>
              </span>                    
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->             
      </div>       
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Ссылка</th>
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
            <td><span v-text="post.title"></span></td>
            <td><a :href="post.link" target="_black">/<span v-text="post.slug"></span></a></td>
            <td>
              <label class="switcher">
                  <input :checked="post.publication" type="checkbox" @change="createChange(post, 'publication', $event)"/>
                  <div class="switcher__text"></div>
              </label>              
            </td>
            <td>
              <label class="switcher">
                  <input :checked="post.commenting" type="checkbox" @change="createChange(post, 'commenting', $event)"/>
                  <div class="switcher__text"></div>
              </label>              
            </td>            
            <td>
              <button class="btn btn-xs btn-info" @click="editPost(post)">Изменить</button>
              <button class="btn btn-xs btn-danger" @click="deletePost(post)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: right;">
        <div class="row pagination">
          <div style="text-align: center;">
            <p>Страница {{ current_page }} из {{ last_page }}</p>
            <div class="input-group" style="max-width: 170px; display: inline-table;">
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page <= 1" @click="firstPage"><<</button>
              </span>            
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page <= 1" @click="prevPage"><</button>
              </span>
              <input type="text" class="form-control input-sm" style="text-align: center;" v-model="current_page" @keyup.13="setPage">
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page === last_page" @click="nextPage">></button>
              </span>      
              <span class="input-group-btn">
                <button class="btn btn-info btn-sm" type="button" :disabled="current_page === last_page" @click="lastPage">>></button>
              </span>                    
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->             
      </div>        
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          posts: [],
          current_page: 0,
          last_page: 0
        }
      },
      mounted(){
        ajaxfun('/api/v1/posts', 'get', null, this.fillTable)
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
          this.current_page = data.current_page;
          this.last_page = data.last_page;          
        },
        nextPage(){
          let url = '/api/v1/posts' + '?page=' + (this.current_page + 1);
          ajaxfun(url, 'get', null, this.fillTable);
        },
        prevPage(){
          let url = '/api/v1/posts' + '?page=' + (this.current_page - 1);
          ajaxfun(url, 'get', null, this.fillTable);
        }, 
        firstPage(){
          let url = '/api/v1/posts' + '?page=1';
          ajaxfun(url, 'get', null, this.fillTable);
        },
        lastPage(){
          let url = '/api/v1/posts' + '?page=' + this.last_page;
          ajaxfun(url, 'get', null, this.fillTable);
        },     
        setPage(){
          if(this.current_page >= 1 && this.current_page <= this.last_page){
            let url = '/api/v1/posts' + '?page=' + this.current_page;
            ajaxfun(url, 'get', null, this.fillTable);
          }
        },
        createChange(model, field, event){
          this.roll = ((model) => {
            let oldState = model[field];
            let _this = this;          
            return function(obj){
              obj[field] = oldState;
              _this.roll = function(){};
            };
          })(model);
          model[field] = (event.target.checked) ? 1 : 0;
          let saveable = {};
          saveable.id = model.id;
          saveable[field] = model[field];
          this.saveModel(saveable, this.createCallback(model));          
        },
        saveModel(post, callback){
          let url = '/api/v1/posts/'+post.id;
          ajaxfun(url, 'put', post, callback);
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
          let url = '/api/v1/posts/'+post.id;
          ajaxfun(url, 'delete', {
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