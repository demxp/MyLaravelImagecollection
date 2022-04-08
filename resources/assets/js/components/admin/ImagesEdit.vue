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
                <multiselect
                :options="cats"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Pick a value"
                v-model="category_id"
                track-by="title"
                label="title"
                style="width: 100%;"
                ></multiselect>
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
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="addimages">Добавить</button>
        </div>
      </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
      components: {Multiselect},  
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
        window.localCache.get('/api/v1/categories', this.fillCategories);
      },
      methods:{
        fillCategories(data){
          data.map((item, i) => this.cats.push(item));
        },
        addimages(){
          if(this.imagefiles.length < 1){
            alert("Выберите, пожалуйста, что загружать - список пуст (");
            return false;
          }

          let toServer = {
            category_id: (this.category_id === null) ? null : this.category_id.id,
            status: 'hide',
            images: this.imagefiles.map(function(item, index, array) {
              return item.processed;
            })
          };

          console.log(toServer)

          let url = '/api/v1/images';
          ajaxfun(url, 'post', toServer, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'index', 'id': null});
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