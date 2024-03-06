<template>
  <Carrusel></Carrusel>
  <h1 class="mt-5">Top Rated</h1>
    <div class="row">
      <div class="col-3" v-for="movie in movies" :key="movie.id">
        <div class="card mb-3">
          <a href="" class="card-img-top ms-0 img-fluid"><img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" class="col-3 card-img-top img-fluid"></a>
          <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1" id="point">
            {{ (movie.vote_average).toFixed(2) }}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">Fecha de salida: <span class="text-success">{{ movie.release_date }}</span></p>
            <button type="button" @click="addWatchlist(movie.id)" class="btn btn-outline-primary" id="mybutton">Añadir a watchlist</button>
            <router-link :to="{ name: 'Movie', params: { id: movie.id }}" class="btn btn-primary">Detalles</router-link>
            <span class="ms-5" v-if="movie.vote_average > 8.55">
              🌟
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import Carrusel from "./Carrusel.vue"

  const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
  const movies = ref([])

  function getMoviesTopRated(){
        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=es-US&page=1`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + bearerToken.value
            },
        })
        .then(response => response.json())
        .then(data => movies.value = data.results)
    }

  onMounted(() => {
    getMoviesTopRated();
  })

  // const moviesFiltradas = computed(() => {
  //   return movies.value.filter(movie => movie.vote_average > 8.55)
  // })

  function addWatchlist(movieId){
        fetch(`https://api.themoviedb.org/3/account/20931000/watchlist`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + bearerToken.value
            },
            body: JSON.stringify({media_type: 'movie', media_id: movieId, watchlist: true})
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.reload();
        })
        .catch(err => console.error(err));
    }

  // const anyadida = computed(() => {
  //   return movieId => {
  //     return movies.value.map(movie => movie.id).includes(movieId);
  //   }
  // });

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

