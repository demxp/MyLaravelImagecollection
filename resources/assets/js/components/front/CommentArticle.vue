<template>
  <li v-if="!isdeleted" :id="blockId">
    <article :class="articleClass">
        <div class="comment-meta" v-if="!editing">
            <div class="comment-author">
                <img src="/img/no_avatar.jpg" alt="images">
                <b class="fn"><a href="#" class="url">{{ comment.name }}</a></b>
                <span class="says">написал:</span>
            </div>
        </div>
        <div-editable v-model="comment.content" :class="contentClass" :enabled="editing"></div-editable>
        <div class="reply">
          <span v-if="!adminMode">
            <a class="comment-reply-link" @click="replyClick(comment)" v-if="!allowEdit">Ответить</a>
            <a class="comment-reply-link" @click="enableEdit()" v-if="allowEdit && !editing" style="color: green;">Редактировать</a>
            <a class="comment-reply-link" @click="deleteClick(comment, hideDeleted)" v-if="allowEdit" style="color: red;">Удалить</a>
            <a class="comment-reply-link" @click="sendComment()" v-if="allowEdit && editing" style="color: green;">Отправить</a>
          </span>
          <span v-if="adminMode">
            <a class="comment-reply-link" @click="replyClick(comment)">Ответить</a>
            <a class="comment-reply-link" @click="enableEdit()" v-if="!editing" style="color: green;">Редактировать</a>
            <a class="comment-reply-link" @click="deleteClick(comment, hideDeleted)" style="color: red;">Удалить</a>
            <a class="comment-reply-link" @click="sendComment()" v-if="editing" style="color: green;">Отправить</a>
            <a class="comment-reply-link" @click="sendAllow()" v-if="comment.commentStatus == 0" style="color: blue;">Одобрить</a>
          </span>          
          <span class="comment-date-updated"><local-time :utc-time="comment.updated_at"></local-time></span>
        </div>
    </article>
    <ul class="children">
      <comment-article
      :comment="child"
      v-for="child in comment.children"
      :key="child.id"
      :reply-click="replyClick"
      :edit-click="editClick"
      :delete-click="deleteClick"
      :allow-click="allowClick"
      :mark-block="markBlock"
      :admin-mode="adminMode"
      ></comment-article>
    </ul><!-- /.children -->
  </li>
</template>

<script>
    export default {
      props: {
        comment: {
          type: Object,
          required: true,
          default: null
        },
        adminMode: {
          type: Boolean,
          required: false,
          default: false
        },
        replyClick: Function,
        editClick: Function,
        deleteClick: Function,
        allowClick: Function,
        markBlock: Function
      },
      data(){
        return{
          isdeleted: false,
          blockId: null,
          editing: false
        }
      },
      mounted(){
        let id = this.comment.id;
        this.blockId = this.markBlock(id);
      },
      methods: {
        hideDeleted(){
          this.isdeleted = true;
        },
        enableEdit(){
          this.editing = true;
        },
        sendComment(){
          this.editClick({
            id: this.comment.id,
            allowEdit: this.comment.allowEdit,
            content: this.comment.content,
            callback: this.renewData
          });
        },
        sendAllow(){
          this.allowClick({
            id: this.comment.id,
            commentStatus: (this.comment.commentStatus == 0) ? 1 : 0,
            callback: this.renewData
          });
        },        
        renewData(req){
          this.editing = false;
          this.comment.allowEdit = req.data.allowEdit;
          if('commentStatus' in req.data) this.comment.commentStatus = req.data.commentStatus;
        }
      },
      computed: {
        allowEdit() {
          let allowEdit = this.comment.allowEdit;
          return !!allowEdit && allowEdit.length > 0
        },
        contentClass() {
          let base = ['comment-content'];
          if(this.editing) base.push('div-editable-enabled');
          return base;
        },
        articleClass() {
          let base = ['comment-body'];
          if(this.comment.fromAdmin) base.push('mark-from-admin');
          if('commentStatus' in this.comment && this.comment.commentStatus == 0) base.push('mark-unallowed');
          return base;
        }
      }
    }
</script>

<style scoped>
  .div-editable-enabled{
    border: 1px solid green;
    background-image: url('/img/icon/pencil.png');
    background-repeat: no-repeat;
    background-size: 30px Auto;
  }
  .comment-reply-link{
    cursor: pointer;
  }
  .mark-from-admin{
    background-color: #fff0fe;
    border: 1px solid red;    
  }
  .mark-unallowed{
    background-color: #ffaeae;
  }
</style>