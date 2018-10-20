<script type="text/javascript">
Vue.component('select2', {
  props: ['options', 'value'],
  template: '<select><slot></slot></select>',
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options, placeholder: "Нет категории" })
      .val(this.value)
      .trigger('change')
      .on('select2:select', function (e) {
        vm.$emit('input', this.value)
      });      
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el)
        .val(value)
        .trigger('change')
    },
    options: function (options) {
      // update options
      $(this.$el).empty().select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).select2('destroy')
  }
});
</script>  

<style>
.load_overlay {
    width: 100%;
    height: 100%;
    /* line-height: 100%; */
    z-index: 999;
    background-color: white;
    opacity: 0.9;
    /* text-align: center; */
    /* vertical-align: middle; */
    position: absolute;
    top: 0px;
    left: 0px;
}

.load_overlay .load_indicator {
    width: 70px;
    height: 70px;
    clear: both;
    text-align: center;
    margin: 0px auto;
}

div.img_container {
    position: relative;
}

div#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -35px;
}
</style>

<script type="text/x-template" id="picture-loader">
  <div class="form-group">
    <div class="row">
      <div class="col-md-10 image-preview col-md-offset-1">
        <a class="btn btn-success btn-xs" @click="process">Загрузить</a>
        <div class="img_container">
          <div v-if="load_indicator" class="load_overlay">
            <div id="floater"></div>
            <div class="load_indicator">
              <img src="/img/loading.gif">
            </div>
          </div>
          <img :src="img.file" class="img-responsive">
        </div>
        <input type="hidden" :value="img.encoded">
      </div>
    </div>
  </div>  
</script> 
<script type="text/javascript">
Vue.component('picture-loader', {
  props: {
    nosquare: {
      type: Boolean,
      required: false,      
      default: false
    },
    noresize: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,      
      default: 0
    },
    sizew: {
      type: Number,
      required: false,      
      default: 0
    }
  },
  template: '#picture-loader',
  data(){
    return {
      img: {
        params: {},
        encoded: "",
        file: "/img/no_picture.jpg"
      },
      load_indicator: false
    }
  },
  mounted(){
    this.checkProps();
  },
  watch: {
    'img.encoded': function (value) {
      // fire event
      this.$emit('imgselected', value)
    },
  },
  methods:{
    checkProps(){
      this.param = (function(p){
        return {
          'noresize': !!p.noresize,
          'nosquare': !!p.nosquare,
          'size': (!!p.size && p.size > 0) ? p.size : 0,
          'sizew': (!!p.sizew && p.sizew > 0) ? p.sizew : 0
        };
      })(this)

      if((this.param.size == 0 && !this.param.noresize && !this.param.nosquare) || (!this.param.noresize && this.param.nosquare && this.param.sizew == 0)){
        alert("INCORRECT IMGRESIZER PARAMS");
        console.log("INCORRECT IMGRESIZER PARAMS", '\r', param);
        throw("INCORRECT IMGRESIZER PARAMS");
      }      
    },
    init(){
      return new Promise(function(resolve, reject) {
        var fileselect = document.createElement('input');
        fileselect.type = 'file';
        fileselect.onchange = function(){
          var selected = this.files[0];
            if (!selected.type.match('image.*')) {
                return reject({
                  text: "Можно загружать только изображения!",
                  errorcode: "Upload no image file"
                });             
            }
              return resolve(URL.createObjectURL(selected));
          };
          var event = new MouseEvent("click");
          fileselect.dispatchEvent(event);
      })
    },
    imageLoader(src) {
      return new Promise(function(resolve, reject){
        var img = document.createElement("img");
        img.onload = function() {
          return resolve(img);
        };
        img.onerror = function(e) {
          return reject({
                text: "Ошибка загрузки",
                errorcode: e
              });
        };
        img.src = src;        
      })
    },
    cropToSquare(img){
      var left, top, side;
      if(img.height > img.width){
        left = 0;
        top = (img.height - img.width)/2;
        side = img.width;
      }else if(img.height < img.width){
        left = (img.width - img.height)/2;
        top = 0;    
        side = img.height;    
      }else{
        left = 0;
        top = 0;
        side = img.width;
      }
        var canvas = document.createElement('canvas');
        canvas.width = side;
        canvas.height = side;
        canvas.getContext('2d').drawImage(img, left, top, img.width, img.height, 0, 0, img.width, img.height);
        img.src = 'about:blank';
        img.width = 1;
        img.height = 1;
        img = canvas;       
        return {
          img: img,
          side: side
        };
    },
    convertToCanvas(img){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        img.src = 'about:blank';
        img.width = 1;
        img.height = 1;
        img = canvas;       
        return img;
    },   
    resize(img, w, h) {
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          var steps = Math.ceil(Math.log(img.width / w) / Math.LN2);
          var sW = w * Math.pow(2, steps - 1);
          var sH = ((!!h) ? h : w) * Math.pow(2, steps - 1);
          var x = 2;
          function run() {
            if ( ! (steps--)) {
              return resolve(img);
            }
            setTimeout(function() {
              var canvas = document.createElement('canvas');
              canvas.width = sW;
              canvas.height = sH;
              canvas.getContext('2d').drawImage(img, 0, 0, sW, sH);
              img.src = 'about:blank';
              img.width = 1;
              img.height = 1;
              img = canvas;
              sW = Math.round(sW / x);
              sH = Math.round(sH / x);
              run();
            }, 0);
          }
          run();
        }, 0);
      })
    },
    process(){
      this.init().then((src) => {
        return this.imageLoader(src)
      }).then((img) => {
        this.load_indicator = true;        
        return img;
      }).then((img) => {
        URL.revokeObjectURL(img.src);       
        if(this.param.nosquare && this.param.noresize){
          return this.convertToCanvas(img);
        }
        if(this.param.nosquare && this.param.sizew > 0){
          if(this.param.sizew >= img.width){
            return this.convertToCanvas(img);
          }
          var sizeh = Math.round(this.param.sizew * img.height / img.width);
            return this.resize(img, this.param.sizew, sizeh);
        }
        if(this.param.noresize){
          return (this.cropToSquare(img)).img;
        }       
        let cropped = this.cropToSquare(img);
        if(this.param.size >= cropped.img.width){
          return cropped.img;
        }       
        return this.resize(cropped.img, this.param.size);
      }).then((img) => {
        this.img.file = img.toDataURL("image/png");
        this.img.encoded = img.toDataURL("image/png");
        this.load_indicator = false;
      }).catch(function(error){
        this.load_indicator = false;
        if(!!error.text){
          alert(error.text);
          console.error(error.errorcode);
        }else{
          alert(error.message);
          console.log(error);         
        }
      })      
    },
  },
});  
</script> 
<script type="text/x-template" id="images-edit">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Добавляем картинку</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Название</label>
                <input type="text" class="form-control" v-model="img.title">
              </div>
              <div class="form-group">
                <label>Категория</label>
                <select2 :options="cats" v-model="img.category_id" style="width: 100%;"></select2>
              </div>
              <div class="form-group">
                <label>Черновик</label>    
                <label class="switcher">
                  <input v-model="img.status" type="checkbox" />
                  <div class="switcher__text"></div>
                </label>
              </div>
              <div class="form-group">
                <label for="exampleInputFile">Картинка</label>
                <picture-loader nosquare :sizew="2000" @imgselected="img.encoded=$event"></picture-loader>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer">
          <a class="btn btn-default" @click="$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null})">Назад</a>
          <button class="btn btn-success pull-right" @click="addimage">Добавить</button>
        </div>
      </div>
</script> 
<script type="text/javascript">
Vue.component('images-upload', {
  props: {
    imageId: {
      type: Number,
      required: false,      
      default: null
    }
  },
  template: '#images-edit',
  data(){
    return{
      cats: [],
      img: {
        title: null,
        category_id: 0,
        status: false,
        encoded: null
      }
    }
  },
  mounted(){
    this.ajaxfun('/api/v1/categories', 'get', null, this.fillCategories);
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
    fillCategories(data){
      this.cats.push({
        titleimage: 0,
        text: "Нет категории",
        id: 0
      });      
      data.map((item, i) => {
        this.cats.push({
          titleimage: item.titleimage,
          text: item.title,
          id: item.id
        });
      });
    },
    addimage(){
      if(this.img.encoded === null){
        alert("Надо выбрать картинку!");
        return false;
      }
      if(this.img.title === null || this.img.title.length < 3){
        alert("Надо написать название!");
        return false;
      }      
      let url = '/api/v1/images';
      this.ajaxfun(url, 'post', {
        title: this.img.title,
        category_id: (this.img.category_id === null || this.img.category_id == 0) ? null : this.img.category_id,
        status: (this.img.status) ? null : 'hide',
        image: this.img.encoded
      }, (req) => {
        if(req.status == 'ok'){
          this.$parent.$emit('switch-mode', {'mode': 'indeximages', 'id': null});
          return true;
        }
        alert("Упс... Какая-то ошибка...");
      });       
    }
  }    
})
</script>