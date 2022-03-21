<template>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Добавляем картинки</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Категория</label>
                <select2 :options="cats" v-model="category_id" style="width: 100%;"></select2>
              </div>
              <div class="form-group">
                <a class="btn btn-success btn-xs uploadbtn" @click="selectImages">Загрузить</a>
              </div>              
              <div class="row">
                <div v-for="(imgfile, index) in imagefiles" :key="imgfile.key" class="col-xs-12 col-md-4">
                  <picture-loader :sizew="2000" nosquare picture="PLImageImage" @imgselected="setEncodedPicture(imgfile.key, $event)" :processImage="imgfile.resource" @deletePicture="imagefiles.splice(index,1)"></picture-loader>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="addimages">Добавить</button>
        </div>
      </div>
</template>

<script>
    export default {
      props: {
        imageId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      data(){
        return{
          cats: [],
          imagefiles: [],
          category_id: 0
        }
      },
      mounted(){
        this.ajaxfun('/api/v1/categories', 'get', null, this.fillCategories);
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
        fillCategories(data){
          this.cats.push({
            titleimage: 0,
            text: "Нет категории",
            id: 0
          });
          data.map((item, i) => {
            this.cats.push({
              titleimage: item.titleimage,
              text: item.title,
              id: item.id
            });
          });
        },
        addimages(){
          if(this.imagefiles.length < 1){
            alert("Выберите, пожалуйста, что загружать - список пуст (");
            return false;
          }

          let toServer = {
            category_id: (this.category_id === null || this.category_id == 0) ? null : this.category_id,
            status: 'hide'
          };

          toServer.images = this.imagefiles.map(function(item, index, array) {
            return item.processed;
          });

          console.log(toServer)

          let url = '/api/v1/images';
          this.ajaxfun(url, 'post', toServer, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null});
              return true;
            }
            alert("Упс... Какая-то ошибка...");
          });       
        },
        selectImages(){
          return new Promise(function(resolve, reject) {
            let fileselect = document.createElement('input');
            fileselect.type = 'file';
            fileselect.multiple = 'multiple';
            let retarray = [];
            fileselect.onchange = function(){
              for(let n in this.files){
                let file = this.files[n];                
                if(typeof(file) == 'object'){
                  if (!file.type.match('image.*')) {
                      return reject({
                        text: "Можно загружать только изображения!",
                        errorcode: "Upload no image file"
                      });             
                  }
                  retarray.push(file);
                }
              }
              return resolve(this.files);
            };
            var event = new MouseEvent("click");
            fileselect.dispatchEvent(event);
          }).then((files) => {
            for(let f in files){
              if(typeof(files[f]) == 'object'){
                this.imagefiles.push({
                  key: cyrb53(files[f].name + files[f].size),
                  resource: files[f],
                  processed: {
                    fname: files[f].name,
                    fstring: ""
                  }
                });
              }
            }
          })
        },
        setEncodedPicture(key, data){
          this.imagefiles.forEach(function(item, index, array) {
            if(item.key == key){
              item.processed.fstring = data;
            }
          });
        }
      }  
    }
</script>

<style scoped>
.uploadbtn {
  margin: 10px auto;
  display: block;
}
</style>