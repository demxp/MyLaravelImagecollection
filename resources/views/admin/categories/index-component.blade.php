<script type="text/x-template" id="categories-index">
  <div class="box">
    <div class="box-body">
      <div class="form-group">
        <a class="btn btn-success" @click="$parent.$emit('switch-mode', {'mode': 'editcategories', 'id': null})">Добавить</a>
      </div>      
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
            <td colspan=3><center><h3>НЕТ ДАННЫХ</h3></center></td>
          </tr>
        </tbody>
        <tbody>
          <tr v-for="cat in cats" :class="{'tr__green':cat.success, 'tr__red':cat.danger}">
            <td>@{{ cat.id }}</td>
            <td><span contenteditable="true" @keydown.13.prevent="setTitle(cat, $event)" v-text="cat.title"></span></td>
            <td>
              <label class="switcher">
                  <input v-model="cat.hidden" type="checkbox" @change="setStatus(cat)"/>
                  <div class="switcher__text"></div>
              </label>
            </td>            
            <td><button class="btn btn-xs btn-danger" @click="deleteCategory(cat)">Удалить</button></td>   
          </tr>                 
        </tbody>
      </table>
    </div>
  </div>
</script>      


<script type="text/javascript">
Vue.component('categories-index', {
  template: '#categories-index',
  data(){
    return{
      cats: []
    }
  },
  mounted(){
    this.ajaxfun('/api/v1/categories', 'get', null, this.fillTable)
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
    fillTable(data){
      data.map((item, i) => {
        item.success = false;
        item.danger = false;
        if(!!this.cats[i]){
          Object.keys(item).map((param) => this.cats[i][param] = item[param]);
        }else{
          this.cats.push(item)
        }
      });
      if(data.length < this.cats.length){
        this.cats.splice(data.length,this.cats.length - data.length);
      }
    },
    saveModel(cat, callback){
      let url = '/api/v1/categories/'+cat.id;
      this.ajaxfun(url, 'put', {
        id: cat.id,
        title: cat.title,
        hidden: (cat.hidden) ? 1 : 0,
      }, callback);        
    },
    setTitle(cat, event){
      let text = event.target.innerText;
      if (text.length < 3) {
        alert("Надо написать название категории! Минимум 3 символа.");
        return false;
      }
      cat.title = text;
      this.saveModel(cat, this.createCallback(cat));
    },
    setStatus(cat, event){
      this.saveModel(cat, this.createCallback(cat));
    },    
    deleteCategory(cat){
      if(!confirm("Вы уверены?")){return false;}
      let url = '/api/v1/categories/'+cat.id;
      this.ajaxfun(url, 'delete', {
        id: cat.id
      }, () => {this.ajaxfun('/api/v1/categories', 'get', null, this.fillTable)});         
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
});
</script>