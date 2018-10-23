<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'uploadimages', 'id': null})">Добавить</a>
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
          <tr v-for="img in imgs" :class="{'tr__green':img.success, 'tr__red':img.danger}">
            <td>{{ img.id }}</td>
            <td><span contenteditable="true" @keydown.13.prevent="setTitle(img, $event)" v-text="img.title"></span></td>
            <td>
              <label class="switcher">
                  <input :checked="img.status" type="checkbox" @change="setStatus(img, $event)"/>
                  <div class="switcher__text"></div>
              </label>
            </td>
            <td>
              <select2 :options="cats" :value="img.category_id" style="width: 100%;" @input="setCategory(img, $event)"></select2>
                <div :class="{ setcattitle:true, 'selected': img.iscattitle }" v-if="img.category_id !== 0">
                  <button type="button" class="btn btn-info btn-xs" @click="setCategoryTitle(img)">Иконка</button>                      
                  <span>Иконка</span>
                </div>
            </td>
            <td><a :href="img.getlink" target="_blank"><img :src="img.thumbnail" class="img-responsive"></a></td>
            <td><button class="btn btn-xs btn-danger" @click="deleteImage(img)">Удалить</button></td>   
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
          imgs: [],
          cats: [],
          current_page: 0,
          last_page: 0
        }
      },
      mounted(){
        this.ajaxfun('/api/v1/images', 'get', null, this.fillTable)
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
          data.categories.map((item, i) => {
            if(!!this.cats[i]){
              this.cats[i].titleimage = item.titleimage;
              this.cats[i].text = item.title;
              this.cats[i].id = item.id;
            }else{
              this.cats.push({
                titleimage: item.titleimage,
                text: item.title,
                id: item.id
              });
            }
          });
          data.images.map((item, i) => {
            item.success = false;
            item.danger = false;
            item.iscattitle = false;
            this.cats.map((cat) => {
              if(cat.titleimage == item.id){
                item.iscattitle = true;
              }              
            })          
            if(!!this.imgs[i]){
              Object.keys(item).map((param) => this.imgs[i][param] = item[param]);
            }else{
              this.imgs.push(item)
            }
          });
          if(data.images.length < this.imgs.length){
            this.imgs.splice(data.images.length,this.imgs.length - data.images.length);
          }
          this.current_page = data.pagesinfo.current_page;
          this.last_page = data.pagesinfo.last_page;
        },
        nextPage(){
          let url = '/api/v1/images' + '?page=' + (this.current_page + 1);
          this.ajaxfun(url, 'get', null, this.fillTable);
        },
        prevPage(){
          let url = '/api/v1/images' + '?page=' + (this.current_page - 1);
          this.ajaxfun(url, 'get', null, this.fillTable);
        }, 
        firstPage(){
          let url = '/api/v1/images' + '?page=1';
          this.ajaxfun(url, 'get', null, this.fillTable);
        },
        lastPage(){
          let url = '/api/v1/images' + '?page=' + this.last_page;
          this.ajaxfun(url, 'get', null, this.fillTable);
        },     
        setPage(){
          if(this.current_page >= 1 && this.current_page <= this.last_page){
            let url = '/api/v1/images' + '?page=' + this.current_page;
            this.ajaxfun(url, 'get', null, this.fillTable);
          }
        },
        checkCatTitle(img){
          for(item in this.cats){
            if(this.cats[item].titleimage == img.id){return true;}
          }
          return false;
        },
        saveModel(img, callback){
          let url = '/api/v1/images/'+img.id;
          this.ajaxfun(url, 'put', {
            id: img.id,
            title: img.title,
            category_id: img.category_id,
            status: (img.status) ? null : 'hide',
            image: null
          }, callback);        
        },
        setTitle(img, event){
          this.roll = ((img) => {
            let old = img.title;
            let _this = this;          
            return function(obj){
              obj.title = old;
              _this.roll = function(){};
            };
          })(img);
          let text = event.target.innerText;
          if (text.length < 3) {return false;}
          img.title = text;
          this.saveModel(img, this.createCallback(img));
        },
        setStatus(img, event){
          this.roll = ((img) => {
            let old = img.status;
            let _this = this;          
            return function(obj){
              obj.status = old;
              _this.roll = function(){};
            };
          })(img);
          img.status = event.target.checked;
          this.saveModel(img, this.createCallback(img));
        },
        setCategory(img, event){
          if(this.selectChangeBlock){return;}
          this.roll = ((img) => {
            let old = img.category_id; 
            let _this = this;
            return function(obj){
              obj.category_id = old;
              _this.roll = function(){};
            };
          })(img);
          let val = event;
          img.category_id = event;
          this.saveModel(img, this.createCallback(img));
        },
        setCategoryTitle(img){
          let url = '/api/v1/categories/'+img.category_id;
          this.ajaxfun(url, 'put', {
            id: img.category_id,
            titleimage: img.id
          }, (req) => {
            if(req.status == "ok"){
              this.imgs.map((image, i) => {
                if(image.category_id == img.category_id){
                  this.imgs[i].iscattitle = false;
                }
              });
              img.iscattitle = true;
            }else{
              customAlert(req);
              obj.danger = true;
              setTimeout(() => {obj.danger = false;},1000);
            }
          });         
        },      
        deleteImage(img){
          if(!confirm("Вы уверены?")){return false;}
          let url = '/api/v1/images/'+img.id;
          this.ajaxfun(url, 'delete', {
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