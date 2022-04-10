<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group top-block">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editpages', 'id': null})">Добавить</a>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Ссылка</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody v-if="pages.length == 0">
            <tr>
              <td colspan=4><center><h3>НЕТ ДАННЫХ</h3></center></td>
            </tr>
          </tbody>        
          <tbody>
            <tr v-for="page in pages" :class="{'tr__green':page.success, 'tr__red':page.danger}">
              <td><span v-text="page.id"></span></td>
              <td><span v-text="page.title"></span></td>
              <td>/<span v-text="page.slug"></span></td>
              <td>
                <button
                class="btn btn-xs btn-info btn-block"
                @click="$parent.$emit('switch-mode', {'mode': 'editpages', 'id': page.id})"
                >Изменить</button>
                <button
                class="btn btn-xs btn-danger btn-block"
                @click="deleteElem(page.id)"
                >Удалить</button>
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
      apiPath: 'staticpage',
      mainArrayName: 'pages',      
      data(){
        return{
          pages: []
        }
      }
    }
</script>