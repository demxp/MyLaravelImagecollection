<template>
  <li v-if="!isdeleted">
    <article class="comment-body">
        <div class="comment-meta">
            <div class="comment-author">
                <img src="/img/no_avatar.jpg" alt="images">
                <b class="fn"><a href="#" class="url">{{ comment.name }}</a></b>
                <span class="says">написал:</span>
            </div>
        </div>
        <div class="comment-content">
            <p>{{ comment.content }}</p>
        </div>
        <div class="reply">
          <span>
            <a class="comment-reply-link" @click="replyClick(comment)" v-if="!allowEdit">Ответить</a>
            <a class="comment-reply-link" @click="editClick(comment)" v-if="allowEdit" style="color: green;">Редактировать</a>
            <a class="comment-reply-link" @click="deleteClick(comment, hideDeleted)" v-if="allowEdit" style="color: red;">Удалить</a>
        </span>
          <span class="comment-date-updated">{{ comment.updated_at }}</span>
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
        replyClick: Function,
        editClick: Function,
        deleteClick: Function
      },
      data(){
        return{
          isdeleted: false
        }
      },
      methods: {
        hideDeleted(){
          this.isdeleted = true;
        }
      },
      computed: {
        allowEdit() {
          let allowEdit = this.comment.allowEdit;
          return !!allowEdit && allowEdit.length > 0
        }
      }
    }
</script>