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
              <button class="btn btn-xs btn-danger" @click="deleteTag(tag)">Удалить</button>
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
          tags: [],
          store: {
            title: '',
            state: false
          }
        }
      },
      mounted(){
        ajaxfun('/api/v1/tags', 'get', null, this.fillTable)
      },
      watch: {
        'store.state': function (value) {
          if(!value){
            this.store.title = '';
          }
        }
      },      
      methods:{
        fillTable(data){
          data.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.tags[i]){
              Object.keys(item).map((param) => this.tags[i][param] = item[param]);
            }else{
              this.tags.push(item)
            }
          });
          if(data.length < this.tags.length){
            this.tags.splice(data.length,this.tags.length - data.length);
          }
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
          if(valid == 'text'){
            let text = event.target.innerText;
            if (text.length < 3) {
              alert("Нужно заполнить поле! Минимум 3 символа.");
              return false;
            }
            model[field] = text;
          }          
          let saveable = {};
          saveable.id = model.id;
          saveable[field] = model[field];
          this.saveModel(saveable, this.createCallback(model));          
        },
        saveModel(data, callback){
          let url = '/api/v1/tags/'+data.id;
          ajaxfun(url, 'put', data, callback);
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
        saveTag(){
          if(this.store.title == ''){
            customAlert({text: 'Заполните имя тега'});
            return false;
          }

          ajaxfun('/api/v1/tags', 'post', {
            title: this.store.title
          }, (req) => {
            if(req.status == 'ok'){
              this.store.state = false;
              ajaxfun('/api/v1/tags', 'get', null, this.fillTable);
            }else{
              customAlert(req);
            }            
          });
        },
        deleteTag(tag){
          if(!confirm("Вы уверены?")){return false;}
          let url = '/api/v1/tags/'+tag.id;
          ajaxfun(url, 'delete', {
            id: tag.id
          }, (req) => {
            if(req.status == 'ok'){
              ajaxfun('/api/v1/tags', 'get', null, this.fillTable);
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