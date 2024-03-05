<template>
  <div class="container">
    <div class="row" v-if="$route.params.id">
      <h1>Detalles de película {{ movie.title }}</h1>
    </div>
    <div class="row" v-else>
      <p class="alert alert-danger">No se ha encontrado la película</p>
    </div>
  </div>
  
</template>

<script>
  import { ref, onMounted, onUnmounted } from 'vue';

  // const id = ref(null);

  // onUnmountednMounted(() => {
  //   id.value = $route.params.id;
  // });


</script>

<style>

</style>