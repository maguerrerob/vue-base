<template>
  <Carrusel></Carrusel>
  <h1 class="mt-5">Top Rated</h1>
  <div class="container">
    <div class="row">
      <div class="col-3" v-for="movie in movies" :key="movie.id">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
        <p>aaaa</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import Carrusel from "./Carrusel.vue"

  const bearerToken = ref('41de32836aa217222959710aa4bfa656')
  const movies = ref([])
  const getMoviesTopRated = () => {
        fetch('https://api.themoviedb.org/3/movie/top_rated', {
            headers: {
                'Authorization': 'Bearer ' + bearerToken.value
            }
        })
        .then(response => response.json())
        .then(data => movies.value = data.results)
    }

  onMounted(() => {
    getMoviesTopRated();
  })

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

