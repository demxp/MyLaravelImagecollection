<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group top-block">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editposts', 'id': null})">Добавить</a>
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Публикация</th>
              <th>Комментирование</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody v-if="posts.length == 0">
            <tr>
              <td colspan=6><center><h3>НЕТ ДАННЫХ</h3></center></td>
            </tr>
          </tbody>        
          <tbody>
            <tr v-for="post in posts" :class="{'tr__green':post.success, 'tr__red':post.danger}">
              <td><span v-text="post.id"></span></td>
              <td><a :href="post.link" target="_black"><span v-text="post.title"></span></a></td>
              <td>
                <div style="text-align: center">
                  <distate-switcher
                  :select="post.publication"
                  :options="switcherPublicationOpts"
                  @change="createChange(post, 'publication', $event, 'native')"
                  ></distate-switcher>              
                </div>
              </td>
              <td>
                <div style="text-align: center">
                  <tristate-switcher
                  mode="switcher"
                  :select="post.commenting"
                  @change="createChange(post, 'commenting', $event, 'native')"
                  :options="switcherCommentingOpts"
                  ></tristate-switcher>
                </div>
              </td>            
              <td>
                <button
                class="btn btn-xs btn-info btn-block"
                @click="$parent.$emit('switch-mode', {'mode': 'editposts', 'id': post.id})"
                >Изменить</button>
                <button
                class="btn btn-xs btn-danger btn-block"
                @click="deleteElem(post.id)"
                >Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: right;">
        <paginate v-model="current_page" :last-page="last_page"></paginate>
      </div> 
    </div>
  </div>
</template>

<script>
    import Paginate from './../reusable/Paginate.vue';
    import { MethodsMixin } from './../mixins/methods.mixin.js';
    import DistateSwitcher from './../reusable/DistateSwitcher.vue';
    import TristateSwitcher from './../reusable/TristateSwitcher.vue';

    export default {
      mixins: [MethodsMixin],
      apiPath: 'post',
      mainArrayName: 'posts',      
      components: {TristateSwitcher, DistateSwitcher, Paginate},  
      data(){
        return{
          posts: [],
          current_page: 0,
          last_page: 0
        }
      },
      watch: {
        'current_page': function (value, old) {
          if(old != 0) this.setPage(value);
        },
      },
      computed:{
        switcherPublicationOpts(){
          return [
            {value: '0', text: 'Закрыто'},
            {value: '1', text: 'Открыто'}
          ];
        },
        switcherCommentingOpts(){
          return [
            {value: '0', text: 'Выключено'},
            {value: '1', text: 'Модерация'},
            {value: '2', text: 'Включено'}
          ];
        }
      }
    }
</script>