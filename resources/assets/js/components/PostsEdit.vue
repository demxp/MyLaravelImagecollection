<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title" v-text="mode.box_title"></h3>
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-md-10">
          <h4>Заголовок</h4>          
          <div class="form-group">
            <input type="text" class="form-control" v-model="post.title">
          </div>
          <h4>Титульная картинка</h4>          
          <div class="row">
            <div class="col-md-2">
              <div class="form-group">
                <label class="switcher">
                  <input v-model="post.title_image_enabled" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>
            </div>
            <div class="col-md-10">
              <div v-if="post.title_image_enabled">
                <input type="text" class="form-control" v-model="post.title_image" placeholder="Ссылка на картинку">
              </div>
            </div>
          </div>
          <h4>Опубликовано</h4>          
          <div class="row">
            <div class="col-md-2">
              <div class="form-group">
                <label class="switcher">
                  <input v-model="post.publication" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>
            </div>
            <div class="col-md-10">
              <div v-if="post.publication">
                <input type="text" class="form-control" v-model="post.publication_date" placeholder="Дата публикации">
              </div>
            </div>
          </div>          
          <h4>Комментирование</h4>          
          <div class="row">
            <div class="col-md-2">
              <div class="form-group">
                <label class="switcher">
                  <input v-model="post.commenting" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>
            </div>
          </div>                    
          <div class="form-group">
            <div id="pagecontent-div" style="width: 100%; min-height: 250px; border: 1px solid black;padding: 10px;" v-html="post.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indexposts', 'id': null})">Назад</a>
      <button class="btn pull-right" :class="{'btn-success':mode.submit_style_success, 'btn-warning':mode.submit_style_warning}" @click="editpost" v-text="mode.submit_text"></button>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        postId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      data(){
        return{
          post: {
            id: null,
            title_image: null,
            title_image_enabled: false,
            title: null,
            content: null,
            publication: false,
            publication_date: null,
            commenting: false
          },
          mode:{
            box_title: "Добавляем пост",
            submit_text: "Добавить",
            submit_style_success: true,
            submit_style_warning: false
          }
        }
      },
      mounted(){
        if(this.postId !== null){
          this.mode = {
            box_title: "Изменяем пост",
            submit_text: "Изменить",
            submit_style_success: false,
            submit_style_warning: true
          };
          let url = '/api/v1/posts/' + this.postId;
          this.ajaxfun(url, 'get', null, (req) => {
            for(let i in req){
              this.post[i] = req[i];
              if(i == 'title_image' && req[i] != null && req[i].length > 3) this.post.title_image_enabled = true;
              if(i == 'publication_date' && req[i] != null){
                let dt = moment(moment(req[i]).utc(true).format()).local();
                this.post.publication_date = dt.format('DD.MM.YYYY HH:mm');
              }
            }
          });       
        }
        this.contentEditor = new nicEditor({
          fullPanel: true,
          iconsPath: '/img/nicEditorIcons.gif'
        }).panelInstance('pagecontent-div');
      },
      watch: {
        'post.title_image_enabled': function (value) {
          if(!value){
            this.title_image = null;
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
        editpost(){
          if(this.post.title === null || this.post.title.length < 3){
            alert("Надо написать заголовок поста!");
            return false;
          }      
          let content = this.contentEditor.nicInstances[0].getContent();
          if(content === null || content.length < 10){
            alert("Надо заполнить контент");
            return false;
          }

          let url = '/api/v1/posts';
          let method = 'post';
          let request_data = {
            title: this.post.title,
            content: content,
            title_image: (this.post.title_image_enabled) ? this.post.title_image : null,
            publication: (this.post.publication) ? 1 : 0,
            commenting: (this.post.commenting) ? 1 : 0,
          };

          if(this.post.publication){
            request_data.publication_date = moment(this.post.publication_date, 'DD.MM.YYYY HH:mm').utc().format('YYYY-MM-DD HH:mm:ss');
          }else{
            request_data.publication_date = null;
          }

          if(this.post.id !== null){
            url += '/' + this.post.id;
            method = 'put';
            request_data.id = this.post.id;
          }
          
          this.ajaxfun(url, method, request_data, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'indexposts', 'id': null});
              return true;
            }
            customAlert(req);
          });       
        }
      }    
    }
</script>

<style scoped>
  label.switcher .switcher__text:before {
    top: 0px;
  }

  label.switcher .switcher__text:after {
    top: 2px;
  }  
</style>