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
        <tbody v-if="pages.length == 0">
          <tr>
            <td colspan=4><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>        
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
        ajaxfun(this.$apiLink('staticpage'), 'get', null, this.fillTable)
      },
      methods:{
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
          ajaxfun(this.$apiLink('staticpage', page.id), 'delete', {
            id: page.id
          }, (req) => {
            if(req.status == 'ok'){
              ajaxfun(this.$apiLink('staticpage'), 'get', null, this.fillTable);
            }else{
              customAlert(req);
            }            
          });
        }
      }  
    }
</script>