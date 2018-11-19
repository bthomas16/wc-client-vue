<template>
  <b-container fluid id="app">
    <app-header></app-header>
    <transition name="slide" >
      <router-view :key="$route.fullPath"></router-view>
    </transition>
      
  </b-container> 
</template>

<script>

    var img1 = new Image();
    img1.onload = function() {  }
    img1.src = "http://localhost:8081/api/static-assets/watcheshomecardbg.jpg";

    var img2 = new Image();
    img2.onload = function() {  }
    img2.src = "http://localhost:8081/api/static-assets/tablebg.jpg";
    
import Header from './components/Header.vue'

  export default {

    components: {
      appHeader: Header
    }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
