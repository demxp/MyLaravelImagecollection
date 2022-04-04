<template>
  <div id="comments" class="comments-area">
      <h4 class="comments-title">Комментарии к посту</h4>

      <ul class="comment-list">
        <comment-article
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
        :reply-click="replyTo"
        :edit-click="editComment"
        :delete-click="deleteComment"
        ></comment-article>
      </ul><!-- /.comment-list -->

      <div id="respond" class="comment-respond" ref="respondArea">
          <h4 id="reply-title" class="comment-reply-title">Оставьте комментарий</h4>
          <form id="commentform" class="comment-form">
              <p class="comment-notes"><span id="email-notes">Ваш адрес Email не будет опубликован.</span> Обязательные поля отмечены звездочками <span class="required">*</span></p>

              <p class="comment-form-comment">
                <label>{{ mode.text }}<span class="reset-reply" v-if="mode.reset" @click="resetReply()">СБРОС</span></label>
                <textarea name="comment" required="required" v-model="formComment.content" ref="InputCommentElem"></textarea>
              </p>

              <p class="comment-form-author"><label>Ваше имя <span class="required">*</span></label> <input name="author" type="text" required="required" v-model="formComment.name"></p>

              <p class="comment-form-email"><label>Ваш Email <span class="required">*</span></label> <input name="email" type="email" required="required" v-model="formComment.email"></p>

              <p class="form-submit"><input name="submit" type="button" class="submit" value="Отправить" @click="sendComment(formComment.parent)"></p>
          </form><!-- /#commentform -->
      </div><!-- /.comment-respond -->
  </div><!-- /.comments-area -->
</template>

<script>
    export default {
      props: {
        postId: {
          type: String,
          required: true,
          default: null
        },
        postSlug: {
          type: String,
          required: true,
          default: null
        }
      },
      data(){
        return{
          formComment: {
            postId: null,
            content: '',
            name: '',
            email: '',
            topCommentId: 0,
            allowEdit: null,
            id: null,
            parent: null
          },
          comments: [],
          mode: {
            key: 'send',
            text: 'Ваш комментарий',
            reset: false
          }
        }
      },
      mounted(){
        this.formComment.postId = this.postId;
        this.getPostComments();
        this.loadTemp();
        this.insertWatch = true;
      },
      watch: {
        'formComment.content': function (value) {
          this.saveTemp();
        },
        'formComment.name': function (value) {
          this.saveTemp();
        },
        'formComment.email': function (value) {
          this.saveTemp();
        }
      },      
      methods:{
        validateEmail(email){
          return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        },
        saveTemp(){
          if(this.insertWatch) localStorage.setItem('TemporaryCommentByPage_' + this.postSlug, JSON.stringify(
            {
              content: this.formComment.content,
              name: this.formComment.name,
              email: this.formComment.email
            }));
        },
        contentNotWatch(text){
          this.insertWatch = false;
          this.formComment.content = text;
          this.insertWatch = true;
        },
        loadTemp(){
          if(!!localStorage.getItem('TemporaryCommentByPage_' + this.postSlug)){
            let saved = JSON.parse(localStorage.getItem('TemporaryCommentByPage_' + this.postSlug));
            for(let k in saved){
              this.formComment[k] = saved[k];
            }
          }
        },
        replyTo(comment){
          this.contentNotWatch(comment.name + ', ');
          this.formComment.topCommentId = comment.id;
          this.formComment.parent = comment;
          this.mode.text = 'Ваш ответ на комментарий';
          this.mode.reset = true;
          this.mode.key = 'reply';
          this.$refs['respondArea'].scrollIntoView({behavior: "smooth"});
          this.$refs['InputCommentElem'].focus();
        },
        resetReply(){
          this.formComment.topCommentId = 0;
          this.formComment.content = '';
          this.formComment.parent = null;
          this.mode.text = 'Ваш комментарий';
          this.mode.reset = false;
          this.mode.key = 'send';
        },
        sendComment(){
          if(this.formComment.name.length < 3){
            customAlert({text: "Вы не назвались, введите ваше имя"});
            return false;
          }      
          if(this.formComment.content.length < 10){
            customAlert({text: "Пустой комментарий, минимум 10 символов"});
            return false;
          }
          let valid = this.validateEmail(this.formComment.email);
          if(valid.constructor.name != "Array" || valid[0] != valid['input']){
            customAlert({text: "Что-то неправильно в Email адресе..."});
            return false;
          }          

          let method = (this.mode.key == 'edit') ? 'put' : 'post';

          ajaxfun('/post/'+this.postSlug+'/comments', method, this.formComment, (req) => {
            this.formComment.content = '';
            switch(this.mode.key){
              case('send'):
                this.comments.push(req)
                break;
              case('edit'):
                this.formComment.parent.content = req.data.content;
                this.formComment.parent.allowEdit = req.data.allowEdit;
                this.resetReply();
                break;
              case('reply'):
                this.formComment.parent.children.push(req);
                this.resetReply();                
                break;
            }

          });       
        },
        editComment(comment){
          this.contentNotWatch(comment.content);
          this.formComment.allowEdit = comment.allowEdit;
          this.formComment.id = comment.id;
          this.formComment.parent = comment;
          this.mode.text = 'Редактирование комментария';
          this.mode.reset = true;
          this.mode.key = 'edit';
          this.$refs['respondArea'].scrollIntoView({behavior: "smooth"});
          let element = this.$refs['InputCommentElem'];
          let position = element.value.length;
          element.focus();
          if (element.setSelectionRange) {
              element.setSelectionRange(position, position);
          } else if (element.createTextRange) {
              let range = element.createTextRange();
              range.collapse(true);
              range.moveEnd('character', position);
              range.moveStart('character', position);
              range.select();
          }
        },
        deleteComment(comment, hidefunc){
          if(!confirm("Вы уверены?")){return false;}
          ajaxfun('/post/'+this.postSlug+'/comments', 'delete', {
            id: comment.id,
            allowEdit: comment.allowEdit
          }, (req) => {
            if(req.status == 'ok'){
              hidefunc();
            }else{
              customAlert(req);
            }           
          });          
        },
        getPostComments(){
          let _this = this;
          ajaxfun('/post/'+this.postSlug+'/comments', 'get', null, (req) => {
            _this.comments = req.data;
          });       
        },
      },
    }
</script>