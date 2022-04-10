<template>
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editusers', 'id': null})">Добавить</a>
      </div>      
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Аватар</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody v-if="users.length == 0">
          <tr>
            <td colspan=5><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>
        <tbody>
          <tr v-for="user in users" :class="{'tr__green':user.success, 'tr__red':user.danger}">
            <td>{{ user.id }}</td>
            <td><span v-text="user.name"></span></td>
            <td><span v-text="user.email"></span></td>            
            <td class="user-avatar"><img :src="user.avatarimage" class="img-circle" /></td>
            <td>
              <button
              class="btn btn-xs btn-warning btn-block"
              @click="$parent.$emit('switch-mode', {'mode': 'userrules', 'id': user.id})"
              >Права</button>            
              <button 
              class="btn btn-xs btn-info btn-block" 
              @click="$parent.$emit('switch-mode', {'mode': 'editusers', 'id': user.id})"
              >Изменить</button>
              <button
              class="btn btn-xs btn-danger btn-block" 
              @click="deleteElem(user)"
              >Удалить</button>
            </td>   
          </tr>                 
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    import { MethodsMixin } from './../mixins/methods.mixin.js';

    export default {
      mixins: [MethodsMixin],
      apiPath: 'user',
      mainArrayName: 'users',
      data(){
        return{
          users: []
        }
      }
    }
</script>

<style>
.user-avatar{
  text-align: center;
  max-width: 120px;
}

.user-avatar img {
    width: 100%;
    max-width: 70px;
    height: auto;
}  
</style>