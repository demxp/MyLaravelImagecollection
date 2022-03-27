<template>
  <div class="slide-bg">
    <div :style="divstyles[0]"></div>
    <div :style="divstyles[1]"></div>
  </div>
</template>

<script>
    export default {
      props: {
        imageLinks:{
          type: Array,
          required: true,
          default: []
        },
        changeTimeout:{
          type: Number,
          required: false,
          default: 10000,
          validator: function (value) {
            return value >= 2000;
          }
        }
      },
      data(){
        return{
          divstyles: [{
            opacity: 0,
            zIndex: 0,
            transitionTimingFunction: '',
            backgroundImage: ''
          },{
            opacity: 0,
            zIndex: 0,
            transitionTimingFunction: '',
            backgroundImage: ''
          }]
        }
      },
      mounted(){
        this.cur = this.current();
        this.imgselect = this.images();
        this.changeTime = 2000;

        let id = this.cur();
        this.divstyles[id.c].backgroundImage = 'url('+this.imgselect()+')';
        this.divstyles[id.c].zIndex = -1;
        this.divstyles[id.c].opacity = 1;

        let proc = this.process;

        this.ticker = setInterval(function(){
          proc();
        }, this.changeTimeout);
      },
      methods:{
        current() {
          let id = 1;
          return function(){
              if(id == 0){
                  id++;
                  return {c: 0, p: 1};
              }else{
                  id--;
                  return {c: 1, p: 0};
              }
          };
        },
        getRandomNum(min, max){
          return Math.floor(Math.random() * (max - min) + min);
        },
        images(){
          let images = [];
          let rnd = this.getRandomNum;
          for(let i in this.imageLinks){
              images.push({
                  url: this.imageLinks[i],
                  rate: 1
              });
          }

          return function(){
              let max = images.length - 1;
              let find_flag = false;
              let ret = '';
              for(let i in images){
                  if(images[i].rate >= max){
                      find_flag = true;
                      images[i].rate = 0;
                      ret = images[i].url;
                  }else{
                      images[i].rate++;
                  }
              }

              if(!find_flag){
                  for(let k in images){
                      let r_find = rnd(0, images.length);
                      if(images[r_find].rate >= 2){
                          ret = images[r_find].url;
                          images[r_find].rate = 0;
                          break;
                      }
                  }
              }
              return ret;
          };
        },
        setup(){
          let id = this.cur();
          this.divstyles[id.c].transitionTimingFunction = 'cubic-bezier(1, .46, 1, .75)';
          this.divstyles[id.c].backgroundImage = 'url('+this.imgselect()+')';
          this.divstyles[id.c].zIndex = -1;
          this.divstyles[id.p].zIndex = -2;
          this.divstyles[id.p].transitionTimingFunction = 'cubic-bezier(.46, 0, .75, 0)';          
          setTimeout(this.switchdivs(id), this.changeTime/2);
        },
        switchdivs(id){
          this.divstyles[id.c].opacity = 1;
          this.divstyles[id.p].opacity = 0;          
        },
        process(){
          setTimeout(this.setup(), this.changeTime/2);
        },
      },
    }
</script>

<style scoped>
div.slide-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -3;
}

div.slide-bg div {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: black;
    background-size: cover;
    -webkit-transition: opacity 1s;
    -o-transition: opacity 1s;
    transition: opacity 1s;
}
</style>