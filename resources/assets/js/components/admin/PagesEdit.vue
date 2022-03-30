<template>
  <div class="box">
    <div class="box-header with-border">
      <h3 class="box-title" v-text="mode.box_title"></h3>
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <label for="exampleInputEmail1">Заголовок</label>
            <input type="text" class="form-control" v-model="page.title">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">URL</label>
            <input type="text" class="form-control" v-model="page.slug">
          </div>
          <div class="form-group">
            <div id="pagecontent-div" style="width: 100%; min-height: 250px; border: 1px solid black;padding: 10px;" v-html="page.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</a>
      <button class="btn pull-right" :class="{'btn-success':mode.submit_style_success, 'btn-warning':mode.submit_style_warning}" @click="editpage" v-text="mode.submit_text"></button>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        pageId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      data(){
        return{
          page: {
            id: null,
            title: null,
            slug: null,
            content: null
          },
          mode:{
            box_title: "Добавляем страницу",
            submit_text: "Добавить",
            submit_style_success: true,
            submit_style_warning: false
          }
        }
      },
      mounted(){
        if(this.pageId !== null){
          this.mode = {
            box_title: "Изменяем страницу",
            submit_text: "Изменить",
            submit_style_success: false,
            submit_style_warning: true
          };
          let url = '/api/v1/staticpages/' + this.pageId;
          ajaxfun(url, 'get', null, (req) => {
            for(let i in req){
              this.page[i] = req[i];
            }
          });       
        }
        this.contentEditor = new nicEditor({
          fullPanel: true,
          iconsPath: '/img/nicEditorIcons.gif'
        }).panelInstance('pagecontent-div');
      },
      methods:{
        editpage(){
          if(this.page.title === null || this.page.title.length < 3){
            alert("Надо написать заголовок страницы!");
            return false;
          }      
          if(this.page.slug === null || this.page.slug.length < 3){
            alert("Надо написать ссылку на страницу");
            return false;
          }          
          let content = this.contentEditor.nicInstances[0].getContent();
          if(content === null || content.length < 10){
            alert("Надо заполнить контент");
            return false;
          }

          let url = '/api/v1/staticpages';
          let method = 'post';
          let request_data = {
            title: this.page.title,
            slug: this.page.slug,
            content: content
          };

          if(this.page.id !== null){
            url += '/' + this.page.id;
            method = 'put';
            request_data.id = this.page.id;
          }
          
          ajaxfun(url, method, request_data, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'index', 'id': null});
              return true;
            }
            customAlert(req);
          });       
        }
      }    
    }
</script>