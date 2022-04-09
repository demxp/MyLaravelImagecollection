<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'uploadimages', 'id': null})">Добавить</a>
      </div>      
      <div style="text-align: right;">
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th style="width:50%;">Название</th>
            <th>Открытая</th>
            <th>Категория</th>
            <th>Картинка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody v-if="imgs.length == 0">
          <tr>
            <td colspan=6><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>
        <tbody>
          <tr v-for="img in imgs" :key="img.id" :class="{'tr__green':img.success, 'tr__red':img.danger}">
            <td>{{ img.id }}</td>
            <td>
              <span contenteditable="true" @keydown.13.prevent="createChange(img, 'title', $event, 'text')" v-text="img.title"></span><br /><br />
              <input type="text" class="imglink bg-info" readonly="readonly" :value="img.fullimage" @click="$event.target.select()">
            </td>
            <td>
              <label class="switcher">
                  <input :checked="img.status" type="checkbox" @change="createChange(img, 'status', $event, 'boolean')"/>
                  <div class="switcher__text"></div>
              </label>
            </td>
            <td>
              <multiselect v-model="img.category" :options="cats" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Pick a value" @select="createChange(img, 'category', $event.id, 'native')" @remove="createChange(img, 'category', null, 'native')" track-by="title" label="title"></multiselect>
                <div :class="{ setcattitle:true, 'selected': img.iscattitle }" v-if="img.category !== null">
                  <button type="button" class="btn btn-info btn-xs" @click="setCategoryTitle(img)">Иконка</button>                      
                  <span>Иконка</span>
                </div>
            </td>
            <td><a :href="img.getlink" target="_blank"><img :src="img.thumbnail" class="img-responsive"></a></td>
            <td>
              <button class="btn btn-xs btn-danger" @click="deleteImage(img)">Удалить</button>
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
    import Multiselect from 'vue-multiselect';
    import Paginate from './Paginate.vue';

    export default {
      components: {Multiselect, Paginate},  
      data(){
        return{
          imgs: [],
          cats: [],
          current_page: 0,
          last_page: 0
        }
      },
      mounted(){
        window.localCache.get(this.$apiLink('category'), this.fillCategories);
        ajaxfun(this.$apiLink('image'), 'get', null, this.fillTable)
      },
      watch: {
        'current_page': function (value) {
          ajaxfun(this.$apiLink('image') + '?page=' + value, 'get', null, this.fillTable);
        },
      },
      methods:{
        fillCategories(data){
          data.map((item, i) => {
            if(!!this.cats[i]){
              this.cats[i].titleimage = item.titleimage;
              this.cats[i].text = item.title;
              this.cats[i].id = item.id;
            }else{
              this.cats.push({
                titleimage: item.titleimage,
                title: item.title,
                id: item.id
              });
            }
          });
        },
        fillTable(data){
          let imgs = data.data;
          imgs.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.imgs[i]){
              Object.keys(item).map((param) => this.imgs[i][param] = item[param]);
            }else{
              this.imgs.push(item)
            }
          });
          if(imgs.length < this.imgs.length){
            this.imgs.splice(imgs.length,this.imgs.length - imgs.length);
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
          if(valid == 'text'){
            model[field] = event.target.innerText;
          }          
          let saveable = {};
          saveable.id = model.id;
          saveable[field] = model[field];
          this.saveModel(saveable, this.createCallback(model));          
        },        
        saveModel(model, callback){
          ajaxfun(this.$apiLink('image', model.id), 'put', model, callback);        
        },
        setCategoryTitle(img){
          ajaxfun(this.$apiLink('category', img.category.id), 'put', {
            id: img.category.id,
            titleimage: img.id
          }, (req) => {
            if(req.status == "ok"){
              this.imgs.map((image, i) => {
                if(!!image.category && image.category.id == img.category.id){
                  this.imgs[i].iscattitle = false;
                }
              });
              img.iscattitle = true;
            }else{
              customAlert(req);
            }
          });         
        },      
        deleteImage(img){
          if(!confirm("Вы уверены?")){return false;}
          ajaxfun(this.$apiLink('image', img.id), 'delete', {
            id: img.id
          }, (req) => {
            if(req.status == 'ok'){
              this.setPage();          
            }else{
              customAlert(req);
            }           
          });         
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.setcattitle {
    text-align: center;
}

.setcattitle span {
    border: 1px solid #0acc29;
    color: #2c68f5;
    padding: 3px;
    border-radius: 3px;
    margin: 5px auto;
    display: none;
}

.setcattitle button {
    margin: 5px auto;
}

.setcattitle.selected button{
    display: none;
}

.setcattitle.selected span{
    display: inline-block;
}

.imglink{
  width: 100%;
}
</style>