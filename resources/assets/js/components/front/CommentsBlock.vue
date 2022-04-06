<template>
  <div id="comments" class="comments-area">
      <h4 class="comments-title">Комментарии к посту</h4>

      <ul class="comment-list">
        <comment-article
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
        :reply-click="replyTo"
        :edit-click="sendComment"
        :delete-click="deleteComment"
        :allow-click="allowComment"
        :mark-block="markNewComment"
        :admin-mode="adminMode"
        ></comment-article>
      </ul><!-- /.comment-list -->

      <div id="respond" class="comment-respond" ref="respondArea">
          <h4 id="reply-title" class="comment-reply-title">Оставьте комментарий</h4>
          <form id="commentform" class="comment-form">
              <p class="comment-notes"><span id="email-notes">Ваш адрес Email не будет опубликован.</span> Обязательные поля отмечены звездочками <span class="required">*</span></p>

              <p class="comment-form-comment">
                <label>{{ mode.text }}
                  <span class="reset-reply" v-if="mode.reset" @click="resetReply()">СБРОС</span>
                </label>
                <textarea name="comment" required="required" v-model="formComment.content" ref="InputCommentElem"></textarea>
                <span>Счетчик символов: {{ counterSymbols }}</span>
              </p>

              <p class="comment-form-author" v-if="!adminMode"><label>Ваше имя <span class="required">*</span></label> <input name="author" type="text" required="required" v-model="formComment.name"></p>

              <p class="comment-form-email" v-if="!adminMode"><label>Ваш Email <span class="required">*</span></label> <input name="email" type="email" required="required" v-model="formComment.email"></p>

              <p class="form-submit"><input name="submit" type="button" class="submit" value="Отправить" @click="sendComment()"></p>
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
        },
        commentLimit: {
          type: String,
          required: true
        },
        adminMode: {
          type: Boolean,
          required: false,
          default: false
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
          },
          counterSymbols: 0
        }
      },
      mounted(){
        this.formComment.postId = this.postId;
        this.counterSymbols = this.commentLimit;
        this.apiLink = ((this.adminMode) ? '/admin' : '') + '/post/'+this.postSlug+'/comments';
        this.getPostComments();
        this.loadTemp();
        this.insertWatch = true;
      },
      watch: {
        'formComment.content': function (value) {
          this.saveTemp();
          this.counterSymbols = this.commentLimit - value.split('').length;
        },
        'formComment.name': function (value) {
          this.saveTemp();
        },
        'formComment.email': function (value) {
          this.saveTemp();
        }
      },      
      methods:{
        markNewComment(id){
          return 'CommentBlockId-' + id;
        },
        scrollToComment(id){
          setTimeout(function(){
            let blockId = 'CommentBlockId-' + id;
            let elem = document.getElementById(blockId);
            if(!!elem){
              elem.scrollIntoView({behavior: "smooth", block: "center"});
            }
          }, 200);
        },
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
        sendComment(data=null){
          let input = data;
          let method = 'put';
          let afterfunc = function(req){
            if(req.status == 'error') return customAlert(req);
            input.callback(req);
            return req;
          };
          if(!input){
            input = this.formComment;
            method = 'post';
            afterfunc = this.afterSendComment;

            if(!this.adminMode){
              if(input.name.length < 3){
                customAlert({text: "Вы не назвались, введите ваше имя"});
                return false;
              }      
              let valid = this.validateEmail(input.email);
              if(valid.constructor.name != "Array" || valid[0] != valid['input']){
                customAlert({text: "Что-то неправильно в Email адресе..."});
                return false;
              }
            }
          }

          if(input.content.length < 10){
            customAlert({text: "Пустой комментарий, минимум 10 символов"});
            return false;
          }

          ajaxfun(this.apiLink, method, input, afterfunc);
        },
        afterSendComment(req){
          if(req.status == 'error') return customAlert(req);
          switch(this.mode.key){
            case('send'):
              this.comments.push(req)
              break;
            case('reply'):
              this.formComment.parent.children.push(req);
              this.resetReply();
              break;
          }
          if(req.moderation === true) customAlert({text: "Для этого поста включена модерация комментариев. Пока ваш комментарий видите только вы...", mode: 'warning'});          
          this.scrollToComment(req.id);
        },
        deleteComment(comment, hidefunc){
          if(!confirm("Вы уверены?")){return false;}
          ajaxfun(this.apiLink, 'delete', {
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
        allowComment(data){
          ajaxfun(this.apiLink, 'put', data, function(req){
            if(req.status == 'error') return customAlert(req);
            data.callback(req);
            return req;
          });
        },
        getPostComments(){
          let _this = this;
          const traverse = (arr, topComment) =>
              arr.filter(comment => comment.topComment === topComment)
              .reduce((result, current) => [
                  ...result,
                  {
                      ...current,
                      children: traverse(arr, current.id)
                  }
              ], [])

          const parseTree = (arr) =>
              arr.filter(({ topComment }) => !topComment)
              .map(comment => ({
                  ...comment,
                  children: traverse(arr, comment.id)
              }))

          let link = (this.adminMode)

          ajaxfun(this.apiLink, 'get', null, (req) => {
            _this.comments = parseTree(req.data);
          });       
        },
      },
    }
</script>