<template>
  <Carrusel></Carrusel>
  <h1 class="mt-5">Top Rated</h1>

  <div class="container mt-5">
    <div class="row">
      <div class="col-4" v-for="movie in moviesFiltradas" :key="movie.id">
        <div class="card mb-4">
          <img :src="'https://image.tmdb.org/t/p/w780' + movieT.poster_path" class="col-3 card-img-top img-fluid">
          <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1">
            {{ (movieT.vote_average * 10).toFixed(2) }}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div class="card-body">
            <h5 class="card-title">{{ movieT.title }}</h5>
            <p class="card-text">{{ movieT.overview.slice(0, 200) + "..." }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-4" v-for="movie in moviesFiltradas" :key="movie.id">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import Carrusel from "./Carrusel.vue"

  const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
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

  const moviesFiltradas = computed(() => {
    return movies.value.filter(movie => movie.vote_average > 8.55)
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

