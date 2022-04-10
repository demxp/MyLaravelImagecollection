export const MethodsMixin = {
  mounted(){
    ajaxfun(this.$apiLink(this.$options.apiPath), 'get', null, this.fillTable)
  },  
  methods: {
    fillCategories(data){
      data.map((item, i) => this.cats.push(item));
    },    
    fillTable(data){
      let an = this.$options.mainArrayName;
      if('meta' in data){
        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;

        data = data.data;        
      }      
      data.map((item, i) => {
        item.success = false;
        item.danger = false;
        if(!!this[an][i]){
          Object.keys(item).map((param) => this[an][i][param] = item[param]);
        }else{
          this[an].push(item)
        }
      });
      if(data.length < this[an].length){
        this[an].splice(data.length, this[an].length - data.length);
      }
    },
    createChange(model, field, event, valid){
      this.roll = ((model) => {
        let oldState = model[field];
        let _this = this;          
        return function(obj){
          obj[field] = oldState;
          _this.roll = function(){};
        };
      })(model);
      if(valid == 'boolean'){
        model[field] = (event.target.checked) ? 1 : 0;
      }
      if(valid == 'text'){
        let text = event.target.innerText;
        model[field] = event.target.innerText;
      }
      if(valid == 'native'){
        model[field] = event;
      }
      let saveable = {};
      saveable.id = model.id;
      saveable[field] = model[field];
      this.saveModel(saveable, this.createCallback(model));          
    },
    saveModel(model, callback){
      ajaxfun(this.$apiLink(this.$options.apiPath, model.id), 'put', model, callback);
    },
    createCallback(obj){
      let roll = this.roll;
      return function(req){
        if(req.status == 'ok'){
          obj.success = true;
          setTimeout(() => {obj.success = false;},1000);
        }else{
          customAlert(req);
          obj.danger = true;
          setTimeout(() => {obj.danger = false;},1000);
          roll(obj);
        }
      };
    },
    deleteElem(id){
      if(!confirm("Вы уверены?")){return false;}
      ajaxfun(this.$apiLink(this.$options.apiPath, id), 'delete', {
        id: id
      }, (req) => {
        if(req.status == 'ok'){
          let isHavedPaginate = (!!this.current_page) ? this.current_page : null;
          this.setPage(isHavedPaginate);
        }else{
          customAlert(req);
        }            
      });
    },
    setPage(id){
      if(!id) return ajaxfun(this.$apiLink(this.$options.apiPath), 'get', null, this.fillTable);
      return ajaxfun(this.$apiLink(this.$options.apiPath) + '?page=' + id, 'get', null, this.fillTable);
    }
  }
}