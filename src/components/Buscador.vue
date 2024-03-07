<!-- router.push -->
<template>
    <!-- <div class="d-flex flex-row">
        <div>
            <button @click="orderby()">Fecha de salida<span>{{ icons[orderby_title] }}</span></button>
        </div>
        <div class="mt-3">
            <p for="">Filtrar por votación</p>
            <input type="range" class="form-range" id="customRange1" min="0" max="10" v-model="inputRange"><span>{{ inputRange }}</span>
        </div>
    </div> -->
    <div class="mt-3">
        <p for="">Filtrar por votación</p>
        <input type="range" class="form-range" id="customRange1" min="0" max="10" v-model="inputRange"><span>{{ inputRange }}</span>
    </div>
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
            <router-link :to="{ name: 'Movie', params: { id: movie.id }}" class="btn btn-primary me-3 ms-1">Detalles</router-link>
            <button type="button" @click="addWatchlist(movie.id)" class="btn btn-outline-primary" id="mybutton">Añadir a watchlist</button>
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
    // const icons = ['-', '↑', '↓'];
    // const orderby_releaseDate = ref(0)
    // const misresults = ref([])

    // const orderby = computed(() => {
    //     filterOrderMovies.value = misresultsresults.value.slice()

    //     orderby_releaseDate.value = (orderby_releaseDate.value + 1) % 3; 
    //     if (orderby_releaseDate.value == 1) {
    //         filterOrderMovies.value.sort((a,b) => new Date(b.release_date) - new Date(a.release_date)) // ordena de menor a mayor
    //     } else if (orderby_releaseDate.value == 2) {
    //         filterOrderMovies.value.sort((a,b) => new Date(b.release_date) - new Date(a.release_date)) // ordena de mayor a menor
    //     }
    // })
    
    function getMoviesBuscador() {
            fetch('https://api.themoviedb.org/3/search/movie?query='+route.query.cadena+'}&include_adult=false&language=es&page=1', {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + bearerToken.value
                }
            })
            .then(response => response.json())
            .then(data => {
                // misresults.value = data.results
                movies.value = data.results
            })
        }

    const orderMovies = computed(() => {
        return [...movies.value].sort((a,b) => new Date(b.release_date) - new Date(a.release_date))
    })

    const filterOrderMovies = computed(() => {
        return [...orderMovies.value].filter(movie => movie.vote_average >= inputRange.value);
    })

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