<template>
  <div class="form-group">
    <input type="hidden" :value="img.encoded">
    <component :is="picture" :image="img.image" :load_indicator="load_indicator" @processUpload="process(false)" :delete_button_visible="processImage" @deletePicture="$emit('deletePicture')"></component>
  </div> 
</template>

<script>
    import PLImageImage from './../reusable/PLImageImage.vue';
    import PLImageAvatar from './../reusable/PLImageAvatar.vue';

    export default {
      components: {PLImageAvatar, PLImageImage},
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
        },
        image: {
          type: String,
          required: false
        },
        processImage: {
          required: false,      
          default: false
        },        
        picture: ""
      },
      data(){
        return {
          img: {
            params: {},
            encoded: "",
            image: ""
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
        image: function(value){
          // set avatar
          this.img.image = this.image;
        }
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
          this.img.image = this.image;
          if(this.processImage){
            return this.process(this.processImage);
          }
        },
        init(data){
          return new Promise(function(resolve, reject) {
            if(typeof(data) == 'object'){
              return resolve(URL.createObjectURL(data));
            }
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
        process(data){
          this.init(data).then((src) => {
            this.load_indicator = true;            
            return this.imageLoader(src)
          }).then((img) => {
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
            this.img.image = img.toDataURL("image/png");
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
      }
    }
</script>