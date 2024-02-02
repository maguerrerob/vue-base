<template>
  <p>wsdwdwd</p>
  <Carrusel></Carrusel>
  <div class="container">
    <div class="row">
        <div class="col-10"> 
          
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Carrusel from "./Carrusel.vue"

</script>

<style lang="scss" scoped>
$color-primario: #183b31;
$color-secundario: #C69774;
$color-terciario: #F8DFD4;
$color-cuarto: #FFEFE8;
header {
  background-color: $color-primario;
  h1 {
    text-decoration: underline;
    color: $color-terciario;
  }
  p {
    color: $color-cuarto;
  }
}
</style>

