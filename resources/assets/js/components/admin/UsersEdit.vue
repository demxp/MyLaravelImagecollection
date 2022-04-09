<template>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title" v-text="mode.box_title"></h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Имя</label>
                <input type="text" class="form-control" v-model="user.name">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="text" class="form-control" v-model="user.email">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Пароль</label>
                <input type="password" class="form-control" v-model="user.password">
              </div>
              <div class="form-group">
                <label for="exampleInputFile">Аватар</label>
                <picture-loader :size="220" picture="PLImageAvatar" @imgselected="user.encoded=$event" :image="user.avatarimage"></picture-loader>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'index', 'id': null})">Назад</a>
          <button class="btn pull-right" :class="{'btn-success':mode.submit_style_success, 'btn-warning':mode.submit_style_warning}" @click="edituser" v-text="mode.submit_text"></button>
        </div>
      </div>
</template>

<script>
    export default {
      props: {
        userId: {
          type: Number,
          required: false,      
          default: null
        }
      },
      data(){
        return{
          user: {
            id: null,
            name: null,
            email: null,
            password: null,
            avatarimage: "/img/no_avatar.jpg",
            encoded: null
          },
          mode:{
            box_title: "Добавляем пользователя",
            submit_text: "Добавить",
            submit_style_success: true,
            submit_style_warning: false
          }
        }
      },
      mounted(){
        if(this.userId !== null){
          this.mode = {
            box_title: "Изменяем пользователя",
            submit_text: "Изменить",
            submit_style_success: false,
            submit_style_warning: true
          };
          ajaxfun(this.$apiLink('user', this.userId), 'get', null, (req) => {
            for(let i in req){
              this.user[i] = req[i];
            }
          });       
        }
      },
      methods:{
        edituser(){
          if(this.user.name === null || this.user.name.length < 3){
            customAlert("Надо написать имя пользователя!");
            return false;
          }      
          if(this.user.email === null || this.user.email.length < 3){
            customAlert("Надо написать Email пользователя!");
            return false;
          }            
          if((this.user.id === null) && (this.user.password === null || this.user.password.length < 3)){
            customAlert("Надо написать пароль пользователя!");
            return false;
          }

          let url = this.$apiLink('user');
          let method = 'post';
          let request_data = {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            avatar: this.user.encoded
          };

          if(this.user.id !== null){
            url += '/' + this.user.id;
            method = 'put';
            request_data.id = this.user.id;
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