<template>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 image-preview">
        <div class="img_container">
          <div v-if="load_indicator" class="load_overlay">
            <div id="floater"></div>
            <div class="load_indicator">
              <img src="/img/loading.gif">
            </div>
          </div>
          <div v-if="delete_button_visible!=false" class="delbtn_overlay" @click="$emit('deletePicture')">
              <img src="/img/delete_btn.png">
          </div>          
          <img :src="image" class="img-responsive">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        image: {
          type: String,
          required: false,      
          default: "/img/no_picture.jpg"      
        },
        load_indicator: {
          type: Boolean,
          required: false,      
          default: false
        },
        delete_button_visible: {
          required: false,      
          default: false
        }        
      }
    }
</script>

<style scoped>
.image-preview a{
  margin: 10px auto;
  display: block;
}

.image-preview img {
    width: 100%;
    height: auto;
}  

.load_overlay {
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: white;
    opacity: 0.9;
    position: absolute;
    top: 0px;
    left: 0px;
}

.delbtn_overlay {
    width: 30px;
    z-index: 999;
    opacity: 0.6;    
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.delbtn_overlay:hover {
    opacity: 1;
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