<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editpages', 'id': null})">Добавить</a>
      </div>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Ссылка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :class="{'tr__green':post.success, 'tr__red':post.danger}">
            <td><span v-text="post.id"></span></td>
            <td><span v-text="post.title"></span></td>
            <td>/<span v-text="post.slug"></span></td>
            <td>
              <button class="btn btn-xs btn-info" @click="editPost(post)">Изменить</button>
              <button class="btn btn-xs btn-danger" @click="deletePost(post)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          posts: []
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
          data.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.posts[i]){
              Object.keys(item).map((param) => this.posts[i][param] = item[param]);
            }else{
              this.posts.push(item)
            }
          });
          if(data.length < this.posts.length){
            this.posts.splice(data.length,this.posts.length - data.length);
          }
        }
      }  
    }
</script>