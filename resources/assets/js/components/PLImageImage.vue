<template>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 image-preview">
        <a class="btn btn-success btn-xs" @click="$emit('processUpload')">Загрузить</a>
        <div class="img_container">
          <div v-if="load_indicator" class="load_overlay">
            <div id="floater"></div>
            <div class="load_indicator">
              <img src="/img/loading.gif">
            </div>
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