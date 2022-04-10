<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group top-block">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editcategories', 'id': null})">Добавить</a>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Скрытая</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody v-if="cats.length == 0">
            <tr>
              <td colspan=4><center><h3>НЕТ ДАННЫХ</h3></center></td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="cat in cats" :class="{'tr__green':cat.success, 'tr__red':cat.danger}">
              <td>{{ cat.id }}</td>
              <td><span contenteditable="true" @keydown.13.prevent="createChange(cat,'title',$event,'text')" v-text="cat.title"></span></td>
              <td>
                <distate-switcher
                :select="cat.hidden"
                :options="switcherOpts"
                 @change="createChange(cat,'hidden',$event,'native')"
                ></distate-switcher>              
              </td>            
              <td><button class="btn btn-xs btn-danger btn-block" @click="deleteElem(cat.id)">Удалить</button></td>   
            </tr>                 
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    import { MethodsMixin } from './../mixins/methods.mixin.js';
    import DistateSwitcher from './../reusable/DistateSwitcher.vue';

    export default {
      components: {DistateSwitcher},
      mixins: [MethodsMixin],
      apiPath: 'category',
      mainArrayName: 'cats',
      data(){
        return{
          cats: []
        }
      },
      computed:{
        switcherOpts(){
          return [
              {value: '1', text: 'Скрытая'},
              {value: '0', text: 'Открытая'}
          ];
        }
      }
    }
</script>