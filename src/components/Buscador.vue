<!-- router.push -->
<template>
    <input type="range" class="form-range" id="customRange1" min="0" max="10" v-model="inputRange"><span>{{ inputRange }}</span>
    <h3>Resultado por: <span>{{ route.query.cadena }}</span></h3>
    <div class="row">
      <div class="col-3" v-for="movie in filterOrderMovies" :key="movie.id">
        <div class="card mb-3">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" class="col-3 card-img-top img-fluid">
          <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1">
            {{ (movie.vote_average).toFixed(2) }}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">Fecha de salida: <span class="text-success">{{ movie.release_date }}</span></p>
            <button type="button" @click="addWatchlist" class="btn btn-outline-primary" id="mybutton">Añadir a watchlist</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, onUpdated } from 'vue'
    import { useRoute } from 'vue-router';

    const route = useRoute();
    // const cadena = route.currentRoute.value.query.cadena
    
    const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
    const movies = ref([])
    const inputRange = ref(0)
    
    function getMoviesBuscador() {
            fetch('https://api.themoviedb.org/3/search/movie?query='+route.query.cadena+'}&include_adult=false&language=es&page=1', {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + bearerToken.value
                }
            })
            .then(response => response.json())
            .then(data => {
                movies.value = data.results
            })
        }

    const orderMovies = computed(() => {
        return [...movies.value].sort((a,b) => new Date(b.release_date) - new Date(a.release_date))
    })

    const filterOrderMovies = computed(() => {
        return orderMovies.value.filter(movie => movie.vote_average >= inputRange.value);
    })


    onMounted(() => {
        getMoviesBuscador();
    })

    onUpdated(() => {
        getMoviesBuscador();
    })

    

</script>

<style scoped>
    #customRange1{
        width: 250px;
    }
</style>