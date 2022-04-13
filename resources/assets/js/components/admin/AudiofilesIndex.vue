<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group top-block">
        <a class="btn btn-success" @click="uploader.state = !uploader.state">Добавить</a>
      </div>
      <div v-if="uploader.state">
        <div class="form-group">
          <label for="exampleInputEmail1">Имя файла</label>
          <input type="text" class="form-control" readonly="readonly" @click="selectFile()" :value="upload.filename">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Название</label>
          <input type="text" class="form-control" v-model="upload.title">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Исполнитель</label>
          <input type="text" class="form-control" v-model="upload.artist">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Альбом</label>
          <input type="text" class="form-control" v-model="upload.album">
        </div>
        <div class="form-group">
          <a class="btn btn-success btn-xs uploadbtn" @click="uploadFile()">
            <span v-if='!uploader.uploading'>Загрузить</span>
              <input v-if='uploader.uploading'
                :value="uploader.uploadPercent"
                type="range"
                min="0"
                max="100"
                id="position"
                name="position"
                disabled="disabled"
              />
              <span v-if='uploader.uploading'>ЗАГРУЗКА</span>
          </a>
        </div>                      
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Исполнитель</th>
              <th>Альбом</th>
              <th>Действия</th>            
            </tr>
          </thead>
          <tbody v-if="afiles.length == 0">
            <tr>
              <td colspan=5><center><h3>НЕТ ДАННЫХ</h3></center></td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="afile in afiles" :class="{'tr__green':afile.success, 'tr__red':afile.danger}">
              <td>{{ afile.id }}</td>
              <td>
                <span contenteditable="true" @keydown.13.prevent="createChange(afile,'title',$event,'text')" v-text="afile.title"></span><br /><br />
                <input type="text" class="imglink bg-info" readonly="readonly" :value="playerCode(afile)" @click="copyText($event)">
              </td>
              <td><span contenteditable="true" @keydown.13.prevent="createChange(afile,'artist',$event,'text')" v-text="afile.artist"></span></td>
              <td><span contenteditable="true" @keydown.13.prevent="createChange(afile,'album',$event,'text')" v-text="afile.album"></span></td>
              <td>
                <button class="btn btn-xs btn-danger btn-block" @click="deleteElem(afile.id)">Удалить</button>
              </td>
            </tr>                 
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    import { MethodsMixin } from './../mixins/methods.mixin.js';
    
    export default {
      mixins: [MethodsMixin],
      apiPath: 'audio',
      mainArrayName: 'afiles',
      data(){
        return{
          afiles: [],
          upload: {
            file: null,
            filename: '',
            title: '',
            artist: '',
            album: ''
          },
          uploader: {
            state: false,
            uploading: false,
            uploadPercent: 0            
          }
        }
      },
      watch: {
        'uploader.state': function (value) {
          if(!value){
            this.upload.file = null;
            this.upload.filename = this.upload.title = this.upload.artist = this.upload.album = '';
          }
        }
      },
      methods:{
        playerCode(afile){
          return '[audio-player,"'+afile.filelink+'","audio-player-id-'+cyrb53(afile.filelink)+'"]';
        },
        copyText(evt){
          evt.target.select();
          return copyTextToClipboard(evt.target.value, true);
        },
        selectFile(){
          if(this.upload.file !== null) return false;
          return new Promise(function(resolve, reject) {
            var fileselect = document.createElement('input');
            fileselect.type = 'file';
            fileselect.onchange = function(){
              var selected = this.files[0];
                if (!selected.type.match(/audio\/(mp3|mpeg)/)) {
                    return reject({
                      text: "Можно загружать только МР3 файлы!",
                      errorcode: "Upload no mp3 file"
                    });             
                }
                return resolve(selected);
            };
            var event = new MouseEvent("click");
            fileselect.dispatchEvent(event);
          }).then((sel) => {
            this.upload.file = sel;
            this.upload.filename = sel.name;
          }).catch((error) => {
            customAlert(error);
            console.log(error);            
          })
        },
        calcPercent(e){
          if(e.lengthComputable){
            this.uploader.uploadPercent = e.loaded / e.total * 100;
          }else{
            this.uploader.uploadPercent = 100;
          }
        },
        uploadFile(){
          if(this.uploader.uploading){
            if(this.request.reset()){
              this.uploader.state = false;
              this.uploader.uploading = false;
              this.uploader.uploadPercent = 0;
            }
            return;
          }
          if(this.upload.file === null){
            alert('Файл не выбран');
            return false;
          }
          if(this.upload.title == ''){
            this.upload.title = this.upload.filename;
          }

          this.uploader.uploading = true;
          this.request = ajaxfun_new(
            this.$apiLink(this.$options.apiPath),
            'POST',
            {
              body: this.upload,
              downloadCallback: function(req){
                req.data.success = true;
                req.data.danger = false;
                this.afiles.push(req.data);
                this.uploader.state = false;
                this.uploader.uploading = false;
                this.uploader.uploadPercent = 0;
              }.bind(this),
              uploadCallback: this.calcPercent.bind(this),
              bodyAsForm: true,
              resetWithConfirm: true
            }
          );
       }
      }  
    }
</script>

<style scoped>
.uploadbtn {
  margin: 10px auto;
  display: block;
}

.imglink{
  width: 100%;
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