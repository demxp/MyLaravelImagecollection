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
          <button class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</button>
          <span style="width: 100%; padding: 0 10px;">
              <input 
                v-if="upload.status"
                :value="upload.perc"
                type="range"
                min="0"
                max="100"
                id="position"
                name="position"
                disabled="disabled"
                style="border-radius: 5px;"
              />
              <span style="display: block;position: absolute;top: 32%;" v-if="upload.status">ЗАГРУЗКА</span>          
            </span>
          <button class="btn btn-success pull-right" @click="addimages" v-if="!upload.status">Добавить</button>
          <button class="btn btn-danger pull-right" @click="resetUpload()" v-if="upload.status">Отменить</button>
        </div>
      </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import PictureLoader from './../reusable/PictureLoader.vue';

    export default {
      apiPath: 'image',
      components: {Multiselect, PictureLoader},  
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
          category_id: 0,
          upload: {
            status: false,
            perc: 0
          }
        }
      },
      mounted(){
        window.localCache.get(this.$apiLink('category'), this.fillCategories);
      },
      methods:{
        calcPercent(e){
          if(e.lengthComputable){
            this.upload.perc = e.loaded / e.total * 100;
          }else{
            this.upload.perc = 100;
          }
        },
        resetUpload(){
          if(this.request.reset()){
            this.upload.status = false;
            this.upload.perc = 0;
            customAlert({text: "Загрузка отменена"});
          }
        },
        fillCategories(data){
          data.map((item, i) => this.cats.push(item));
        },
        addimages(){
          if(this.imagefiles.length < 1){
            customAlert({text: "Выберите, пожалуйста, что загружать - список пуст ("});
            return false;
          }

          let check = this.imagefiles.find(function(item, index, array) {
            return item.completed === false;
          });

          if(!!check){
            customAlert({text: "Обработка не окончена, подождите..."}); 
            return false;
          }

          let toServer = {
            category_id: (this.category_id === null) ? null : this.category_id.id,
            status: 'hide',
            images: this.imagefiles.map(function(item, index, array) {
              return item.processed;
            })
          };

          this.upload.status = true;

          this.request = ajaxfun_new(
            this.$apiLink(this.$options.apiPath),
            'POST',
            {
              body: toServer,
              downloadCallback: function(req){
                if(req.status == 'ok'){
                  this.$parent.$emit('switch-mode', {'mode': 'index', 'id': null});
                  return true;
                }
                alert("Упс... Какая-то ошибка...");
              }.bind(this),
              uploadCallback: this.calcPercent.bind(this),
              resetWithConfirm: true
            }
          );
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
                  completed: false,
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
              item.completed = true;
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
.box-footer{
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
}

input[type='range'] {
    overflow: hidden;
    -webkit-appearance: none;
    background-color: #00af16;
}

input[type='range']::-webkit-slider-runnable-track {
    height: 20px;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;
}

input[type='range']::-webkit-slider-thumb {
    width: 0;
    -webkit-appearance: none;
    height: 20px;
    background: #434343;
    box-shadow: -2500px 0 0 2500px #43e5f7;
}

input[type="range"]::-moz-range-progress {
    background-color: #43e5f7; 
}
input[type="range"]::-moz-range-track {  
    background-color: #9a905d;
}
input[type="range"]::-ms-fill-lower {
    background-color: #43e5f7; 
}
input[type="range"]::-ms-fill-upper {  
    background-color: #9a905d;
}
</style>