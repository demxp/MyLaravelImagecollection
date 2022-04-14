export const MethodsMixin = {
  mounted(){
    if(!!this.$options.apiPath) ajaxfun(this.$apiLink(this.$options.apiPath), 'get', null, this.fillTable)
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
    },
    formatHTML(html) {
      var indent = '\n';
      var tab = '\t';
      var i = 0;
      var pre = [];

      html = html
      .replace(new RegExp('<pre>((.|\\t|\\n|\\r)+)?</pre>'), function (x) {
        pre.push({ indent: '', tag: x });
        return '<--TEMPPRE' + i++ + '/-->'
      })
      .replace(new RegExp('<[^<>]+>[^<]?', 'g'), function (x) {
        var ret;
        var tag = /<\/?([^\s/>]+)/.exec(x)[1];
        var p = new RegExp('<--TEMPPRE(\\d+)/-->').exec(x);

        if (p) pre[p[1]].indent = indent;

        if (['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(tag) >= 0) // self closing tag
          ret = indent + x;
        else {
          if (x.indexOf('</') < 0) { //open tag
            if (x.charAt(x.length - 1) !== '>')
              ret = indent + x.substr(0, x.length - 1) + indent + tab + x.substr(x.length - 1, x.length);
            else 
              ret = indent + x;
            !p && (indent += tab);
          } else {//close tag
            indent = indent.substr(0, indent.length - 1);
            if (x.charAt(x.length - 1) !== '>')
              ret =  indent + x.substr(0, x.length - 1) + indent + x.substr(x.length - 1, x.length);
            else
              ret = indent + x;
          }
        }
        return ret;
      });

      for (i = pre.length; i--;) {
        html = html.replace('<--TEMPPRE' + i + '/-->', pre[i].tag.replace('<pre>', '<pre>\n').replace('</pre>', pre[i].indent + '</pre>'));
      }

      return html.charAt(0) === '\n' ? html.substr(1, html.length - 1) : html;
    },
    unformatHTML(html) {
      var i = 0;
      var pre = [];

      html = html.replace(new RegExp('<pre>((.|\\t|\\n|\\r)+)?</pre>'), function (x) {
        pre.push(x);
        return '<--TEMPPRE' + i++ + '/-->'
      }).replace(/\n/g, '').replace(/\t/g, '');

      for (i = pre.length; i--;) {
        html = html.replace('<--TEMPPRE' + i + '/-->', pre[i]);
      }

      html = html.replace(new RegExp('<pre>\\n'), '<pre>').replace(new RegExp('\\n\\t*</pre>'), '</pre>');
      return html;
    },    
  }
}