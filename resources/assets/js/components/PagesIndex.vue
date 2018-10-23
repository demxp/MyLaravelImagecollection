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
          <tr v-for="page in pages" :class="{'tr__green':page.success, 'tr__red':page.danger}">
            <td><span v-text="page.id"></span></td>
            <td><span v-text="page.title"></span></td>
            <td>/<span v-text="page.slug"></span></td>
            <td>
              <button class="btn btn-xs btn-info" @click="editPage(page)">Изменить</button>
              <button class="btn btn-xs btn-danger" @click="deletePage(page)">Удалить</button>
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
          pages: []
        }
      },
      mounted(){
        this.ajaxfun('/api/v1/staticpages', 'get', null, this.fillTable)
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
            if(!!this.pages[i]){
              Object.keys(item).map((param) => this.pages[i][param] = item[param]);
            }else{
              this.pages.push(item)
            }
          });
          if(data.length < this.pages.length){
            this.pages.splice(data.length,this.pages.length - data.length);
          }
        },
        editPage(page){
          this.$parent.$emit('switch-mode', {'mode': 'editpages', 'id': page.id});      
        },
        deletePage(page){
          if(!confirm("Вы уверены?")){return false;}
          let url = '/api/v1/staticpages/'+page.id;
          this.ajaxfun(url, 'delete', {
            id: page.id
          }, (req) => {
            if(req.status == 'ok'){
              this.ajaxfun('/api/v1/staticpages', 'get', null, this.fillTable);
            }else{
              customAlert(req);
            }            
          });
        }
      }  
    }
</script>