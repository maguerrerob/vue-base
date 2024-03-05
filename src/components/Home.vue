<template>
  <Carrusel></Carrusel>
  <h1 class="mt-5">Top Rated</h1>
    <div class="row">
      <div class="col-3" v-for="movie in moviesFiltradas" :key="movie.id">
        <div class="card mb-3">
          <a href="" class="card-img-top ms-0 img-fluid"><img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" class="col-3 card-img-top img-fluid"></a>
          <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1" id="point">
            {{ (movie.vote_average).toFixed(2) }}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div class="card-body">
            <a :href="'/Movie/${movie.id}'"><h5 class="card-title">{{ movie.title }}</h5></a>
            <p class="card-text">Fecha de salida: <span class="text-success">{{ movie.release_date }}</span></p>
            <button type="button" @click="addWatchlist" class="btn btn-outline-primary" id="mybutton">Añadir a watchlist</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import Carrusel from "./Carrusel.vue"

  const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
  const movies = ref([])
  const getMoviesTopRated = () => {
    console.log(movies.id)

        fetch('https://api.themoviedb.org/3/account/20931000/watchlist', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + bearerToken.value
            },
          body: JSON.stringify({
            media_type: 'movie',
            media_id: movies.id,
            watchlist: true
          })
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

  const addWatchlist = () => {
    fetch('https://api.themoviedb.org/3/account/20931000/watchlist', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + bearerToken.value
      },
      body: {
        media_type: 'movie',
        media_id: 278,
        watchlist: true
      }
    })
    .then(response => response.json())
    .then(data => movies.value = data.results)
  }



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

  a{
    text-decoration: none;
  }
</style>

