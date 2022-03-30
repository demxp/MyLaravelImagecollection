<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="upload.state = !upload.state">Добавить</a>
      </div>
      <div v-if="upload.state">
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
          <a class="btn btn-success btn-xs uploadbtn" @click="uploadFile()">Загрузить</a>
        </div>                      
      </div>
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
              <input type="text" class="imglink bg-info" readonly="readonly" :value="afile.filelink" @click="$event.target.select()">
            </td>
            <td><span contenteditable="true" @keydown.13.prevent="createChange(afile,'artist',$event,'text')" v-text="afile.artist"></span></td>
            <td><span contenteditable="true" @keydown.13.prevent="createChange(afile,'album',$event,'text')" v-text="afile.album"></span></td>
            <td>
              <button class="btn btn-xs btn-danger" @click="deleteAfile(afile)">Удалить</button>
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
          afiles: [],
          upload: {
            file: null,
            filename: '',
            title: '',
            artist: '',
            album: '',
            state: false
          }
        }
      },
      mounted(){
        this.ajaxfun('/api/v1/audiofiles', 'get', null, this.fillTable)
      },
      watch: {
        'upload.state': function (value) {
          if(!value){
            this.upload.file = null;
            this.upload.filename = this.upload.title = this.upload.artist = this.upload.album = '';
          }
        }
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
            if(!!this.afiles[i]){
              Object.keys(item).map((param) => this.afiles[i][param] = item[param]);
            }else{
              this.afiles.push(item)
            }
          });
          if(data.length < this.afiles.length){
            this.afiles.splice(data.length,this.afiles.length - data.length);
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
          let url = '/api/v1/audiofiles/'+data.id;
          this.ajaxfun(url, 'put', data, callback);
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
        selectFile(){
          if(this.upload.file !== null) return false;
          return new Promise(function(resolve, reject) {
            var fileselect = document.createElement('input');
            fileselect.type = 'file';
            fileselect.onchange = function(){
              var selected = this.files[0];
                if (!selected.type.match('audio/mp3')) {
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
        uploadFile(){
          if(this.upload.file === null){
            alert('Файл не выбран');
            return false;
          }
          if(this.upload.title == ''){
            this.upload.title = this.upload.filename;
          }

          const fd = new FormData();
          for(let i in this.upload){
            fd.append(i, this.upload[i]);
          }

          fetch('/api/v1/audiofiles', {
              method: 'POST',
              headers: {'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content},
              body: fd
          })
          .then(res => res.json())
          .then((json) => {
            if(json.status != 'ok'){
              throw json;
            }
            this.afiles.push(json.data);
            this.upload.state = false;
          }).catch((err) => {
            customAlert(err);
          });
        },
        deleteAfile(afile){
          if(!confirm("Вы уверены?")){return false;}
          let url = '/api/v1/audiofiles/'+afile.id;
          this.ajaxfun(url, 'delete', {
            id: afile.id
          }, (req) => {
            if(req.status == 'ok'){
              this.ajaxfun('/api/v1/audiofiles', 'get', null, this.fillTable);
            }else{
              customAlert(req);
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

.imglink{
  width: 100%;
}
</style>