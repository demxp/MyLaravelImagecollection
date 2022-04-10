<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group top-block">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'uploadimages', 'id': null})">Добавить</a>
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
      <div class="table-responsive">
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
                <distate-switcher
                no-label
                :select="img.status"
                :options="switcherOpts"
                 @change="createChange(img, 'status', $event, 'native')"
                ></distate-switcher>                            
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
                <button class="btn btn-xs btn-danger btn-block" @click="deleteElem(img.id)">Удалить</button>
              </td>   
            </tr>                 
          </tbody>
        </table>
      </div>
      <div style="text-align: right;">
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
    </div>
  </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import Paginate from './../reusable/Paginate.vue';
    import { MethodsMixin } from './../mixins/methods.mixin.js';
    import DistateSwitcher from './../reusable/DistateSwitcher.vue';

    export default {
      mixins: [MethodsMixin],
      apiPath: 'image',
      mainArrayName: 'imgs',      
      components: {DistateSwitcher, Multiselect, Paginate},  
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
      },
      watch: {
        'current_page': function (value, old) {
          if(old != 0) this.setPage(value);
        },
      },
      computed:{
        switcherOpts(){
          return [
              {value: '0', text: 'Скрытая'},
              {value: '1', text: 'Открытая'}
          ];
        }
      },
      methods:{
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

div.form-group > 
margin-top: 46px;
    display: table;
</style>