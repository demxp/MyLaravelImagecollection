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
              <button class="btn btn-xs btn-warning btn-block" @click="editUserRules(user)">Права</button>            
              <button class="btn btn-xs btn-info btn-block" @click="editUser(user)">Изменить</button>
              <button class="btn btn-xs btn-danger btn-block" @click="deleteUser(user)">Удалить</button>
            </td>   
          </tr>                 
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          users: []
        }
      },
      mounted(){
        ajaxfun(this.$apiLink('user'), 'get', null, this.fillTable)
      },
      methods:{
        fillTable(data){
          data.map((item, i) => {
            item.success = false;
            item.danger = false;
            if(!!this.users[i]){
              Object.keys(item).map((param) => this.users[i][param] = item[param]);
            }else{
              this.users.push(item)
            }
          });
          if(data.length < this.users.length){
            this.users.splice(data.length,this.users.length - data.length);
          }
        },
        editUser(user){
          this.$parent.$emit('switch-mode', {'mode': 'editusers', 'id': user.id});      
        },
        editUserRules(user){
          this.$parent.$emit('switch-mode', {'mode': 'userrules', 'id': user.id});      
        },        
        deleteUser(user){
          if(!confirm("Вы уверены?")){return false;}
          ajaxfun(this.$apiLink('user', user.id), 'delete', {
            id: user.id
          }, () => {ajaxfun(this.$apiLink('user'), 'get', null, this.fillTable)});         
        },
        createCallback(obj){
          return function(req){
            if(req.status == 'ok'){
              obj.success = true;
              setTimeout(() => {obj.success = false;},1000);
            }else{
              obj.danger = true;
              setTimeout(() => {obj.danger = false;},1000);            
            }
          };        
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