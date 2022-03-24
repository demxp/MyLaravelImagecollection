<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editpages', 'id': null})">Добавить</a>
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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :class="{'tr__green':post.success, 'tr__red':post.danger}">
            <td><span v-text="post.id"></span></td>
            <td><span v-text="post.title"></span></td>
            <td>/<span v-text="post.slug"></span></td>
            <td>
              <label class="switcher">
                  <input :checked="post.publication" type="checkbox" @change="setPublic(post, $event)"/>
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
        this.ajaxfun('/api/v1/posts', 'get', null, this.fillTable)
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
        fillTable(data){
          data.data.blogposts.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.posts[i]){
              Object.keys(item).map((param) => this.posts[i][param] = item[param]);
            }else{
              this.posts.push(item)
            }
          });
          if(data.data.blogposts.length < this.posts.length){
            this.posts.splice(data.blogposts.length, this.posts.length - data.data.blogposts.length);
          }
          this.current_page = data.data.count;
          this.last_page = data.data.total;          
        },
        nextPage(){
          let url = '/api/v1/posts' + '?page=' + (this.current_page + 1);
          this.ajaxfun(url, 'get', null, this.fillTable);
        },
        prevPage(){
          let url = '/api/v1/posts' + '?page=' + (this.current_page - 1);
          this.ajaxfun(url, 'get', null, this.fillTable);
        }, 
        firstPage(){
          let url = '/api/v1/posts' + '?page=1';
          this.ajaxfun(url, 'get', null, this.fillTable);
        },
        lastPage(){
          let url = '/api/v1/posts' + '?page=' + this.last_page;
          this.ajaxfun(url, 'get', null, this.fillTable);
        },     
        setPage(){
          if(this.current_page >= 1 && this.current_page <= this.last_page){
            let url = '/api/v1/posts' + '?page=' + this.current_page;
            this.ajaxfun(url, 'get', null, this.fillTable);
          }
        },
        setPublic(post, event){
          this.roll = ((post) => {
            let old = post.publication;
            let _this = this;          
            return function(obj){
              obj.publication = old;
              _this.roll = function(){};
            };
          })(post);
          post.publication = (event.target.checked) ? 1 : 0;
          this.saveModel(post, this.createCallback(post));
        },
        saveModel(post, callback){
          let url = '/api/v1/posts/'+post.id;
          this.ajaxfun(url, 'put', post, callback);
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
        }        
      }  
    }
</script>