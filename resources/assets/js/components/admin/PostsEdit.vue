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
          <distate-switcher no-label :select="post.title_image_enabled"
          :options="switcherOpts" class="post-option-switcher"
          @change="post.title_image_enabled = $event">
            <h4 slot="post">Титульная картинка</h4>
          </distate-switcher> 
          <div class="row form-group">
            <div class="col-md-12">
              <div v-if="post.title_image_enabled == '1'">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="post.title_image">
                </div>
                <multiselect :options="images" :close-on-select="true" :show-labels="false" label="title" track-by="title" placeholder="Выберите картинку" @select="post.title_image = $event.fullimage">
                  <template slot="option" slot-scope="props">
                    <img class="option__image" :src="props.option.thumbnail">
                    <div class="option__desc"><span class="option__title">{{ props.option.title }}</span></div>
                  </template>                  
                </multiselect>
              </div>
            </div>
          </div>
          <distate-switcher no-label :select="isPublished"
          :options="switcherOpts" class="post-option-switcher"
          @change="post.publication = ($event == '1')">
            <h4 slot="post">Опубликовано</h4>
          </distate-switcher> 
          <div class="row form-group">
            <div class="col-md-12">
              <div v-if="post.publication">
                <date-pick 
                v-model="post.publication_date" 
                :pickTime="true" 
                :format="'DD.MM.YYYY HH:mm'" 
                :inputAttributes="{class: ['form-control', 'other-classes']}"
                nextMonthCaption="Следующий месяц"
                prevMonthCaption="Предыдущий месяц"
                setTimeCaption="Выберите время"
                :weekdays="['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']"
                :months="['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']"
                ></date-pick>
              </div>
            </div>
          </div>
          <tristate-switcher
          mode="switcher"
          v-model="post.commenting"
          :options="switcherComment"
          class="post-option-switcher"
          ><h4 slot="pre">Комментирование: </h4></tristate-switcher>          
          <h4>Теги поста</h4>
          <div class="row">
            <div class="col-md-12">
              <multiselect
              v-model="post.tags"
              :options="tags"
              :multiple="true"
              :group-select="true"
              placeholder="Type to search"
              track-by="title"
              label="title"
              ></multiselect>
            </div>
          </div>          
          <div class="form-group">
            <div id="pagecontent-div" style="width: 100%; min-height: 250px; border: 1px solid black;padding: 10px;" v-html="post.content"></div>
            <button class="btn btn-default btn-xs" @click="formatContent" v-if="!contentAsHtml">HTML</button>
          </div>
          <div class="form-group" v-if="contentAsHtml">
            <textarea v-model="contentHtml" style="width: 100%;min-height: 250px;border: 1px solid black;padding: 10px;"></textarea>
            <button class="btn btn-default btn-xs" @click="applyFormatted" v-if="contentAsHtml">SAVE</button>
          </div>          
        </div>
      </div>
    </div>
    <div class="box-footer">
      <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</a>
      <button class="btn pull-right" :class="{'btn-success':mode.submit_style_success, 'btn-warning':mode.submit_style_warning}" @click="editpost" v-text="mode.submit_text"></button>
    </div>
  </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import Multiselect from 'vue-multiselect';
    import DistateSwitcher from './../reusable/DistateSwitcher.vue';
    import TristateSwitcher from './../reusable/TristateSwitcher.vue';
    import { MethodsMixin } from './../mixins/methods.mixin.js';

    export default {
      mixins: [MethodsMixin],
      components: {DatePick, Multiselect, DistateSwitcher, TristateSwitcher},
      props: {
        postId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      computed:{
        switcherOpts(){
          return [
              {value: '0', text: 'Нет'},
              {value: '1', text: 'Есть'}
          ];
        },
        switcherComment(){
          return [
              {value: '0', text: 'закрыто'},
              {value: '1', text: 'с модерацией'},
              {value: '2', text: 'открыто'}
          ];
        },        
        isPublished(){
          return (this.post.publication) ? '1' : '0';
        }
      },
      data(){
        return{
          post: {
            id: null,
            title_image: null,
            title_image_enabled: '0',
            title: null,
            content: null,
            publication: false,
            publication_date: null,
            commenting: '0',
            tags: []
          },
          mode:{
            box_title: "Добавляем пост",
            submit_text: "Добавить",
            submit_style_success: true,
            submit_style_warning: false
          },
          tempTags: [],
          tags: [],
          images: [],
          contentHtml: '',
          contentAsHtml: false
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
          ajaxfun(this.$apiLink('post', this.postId), 'get', null, (req) => {
            let post = req;
            for(let i in post){
              this.post[i] = post[i];  
              if(i == 'title_image' && post[i] != null && post[i].length > 3) this.post.title_image_enabled = '1';
              if(i == 'publication_date' && post[i] != null){
                let dt = moment(moment(post[i]).utc(true).format()).local();
                this.post.publication_date = dt.format('DD.MM.YYYY HH:mm');
              }
            }
          });
        }
        ajaxfun(this.$apiLink('tag'), 'get', null, (req) => {
          req.map((item, i) => {
            this.tags.push(item);
          });
        });
        ajaxfun(this.$apiLink('image') + '/thumblist', 'get', null, (req) => {
          req.map((item, i) => {
            this.images.push(item);
          });
        });
        this.contentEditor = new nicEditor({
          fullPanel: true,
          iconsPath: '/img/nicEditorIcons.gif'
        }).panelInstance('pagecontent-div');
      },
      watch: {
        'post.title_image_enabled': function (value) {
          if(value == '0'){
            this.post.title_image = null;
          }
        },
      },      
      methods:{
        formatContent() {
            this.contentHtml = this.formatHTML(this.post.content);
            this.contentAsHtml = true;
        },
        applyFormatted() {
            this.post.content = this.unformatHTML(this.contentHtml);
            this.contentHtml = '';
            this.contentAsHtml = false;
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

          let url = this.$apiLink('post');
          let method = 'post';
          let request_data = {
            title: this.post.title,
            content: content,
            title_image: (this.post.title_image_enabled) ? this.post.title_image : null,
            publication: (this.post.publication) ? 1 : 0,
            commenting: this.post.commenting,
            tags: this.post.tags
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  .post-option-switcher{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 15px;
  }

  div.post-option-switcher h4:first-child{
    margin: 0 20px 0 0;
  }  

  div.post-option-switcher h4:last-child{
    margin: 0 0 0 20px;
  }

  label.switcher .switcher__text:before {
    top: 0px;
  }

  label.switcher .switcher__text:after {
    top: 2px;
  }
  .vdpComponent {
    width: 100%;
  }
</style>