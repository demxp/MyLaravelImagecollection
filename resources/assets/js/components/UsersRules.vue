<template>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Управление правами пользователя</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-10">
              <div class="rule-component" v-for="(rule, id) in allrules">
                <h4 :class="getClass(rule)" v-text="getText(rule)"></h4>
                <div class="rule-mode" v-for="mode in rule[3]">
                  <label>
                    <input type="radio" :name="id" v-model="rule[2]" :value="mode">
                    <span v-text="getRuleName(mode)"></span>
                  </label>
                </div>
              </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indexusers', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="save">Изменить</button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        userId: {
          type: Number,
          required: true
        }
      },
      data(){
        return{
          allrules: []
        }
      },
      mounted(){
        let url = '/api/v1/users/' + this.userId + '/rules';
        this.ajaxfun(url, 'get', null, this.fillRules);           
      },
      methods:{
        ajaxfun(url, method, body=null, callback){
          fetch(url, {
            method: method,
            headers: {  
                  "Content-type": "application/json; charset=UTF-8",
                  'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
            },
            body: (body !== null) ? JSON.stringify(body) : null
          }).then(response => {
              return response.json();
          }).then(req => {
              return callback(req);
          }).catch(e => {
              console.log(e);
          });         
        },
        fillRules(req){
          req["data"].map((rule) => {
            this.allrules.push(rule);
          })
          this.modes = req["rules"];
          this.texts = req["names"];
        },
        getText(v){
          if(!!v[2]){
            return this.texts[v[1]] + " " + this.texts[v[0]] + " " + this.texts[v[2]];
          }else{
            return this.texts[v[1]] + " " + this.texts[v[0]] + " - НЕ ЗАДАНО";
          }
        },
        getClass(v){
          switch(v[2]){
            case('allow'):
              return "bg-success";
            case('owned'):
              return "bg-warning";
            case('deny'):
              return "bg-danger";
            default:
              return "bg-info";
          }
        },
        getRuleName(v){
          return this.texts[v];
        },
        save(){
          let ret = this.allrules.map((rule) => {
            if(rule[2] != ""){
              return [rule[0], rule[1], rule[2]];
            }
          });
          let url = '/api/v1/users/' + this.userId + '/rules';      
          this.ajaxfun(url, 'put', ret, (req) => {
            if(req.status == 'ok'){
              this.$parent.$emit('switch-mode', {'mode': 'indexusers', 'id': null});
              return true;
            }
            customAlert(req);
          });
        }    
      }
    }
</script>