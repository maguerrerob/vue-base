<!-- router.push -->
<template>
    <input type="range">
    <h3>Resultado por: <span>{{ route.query.cadena }}</span></h3>

    <div class="row">
      <div class="col-3" v-for="movie in movies" :key="movie.id">
        <div class="card mb-3">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" class="col-3 card-img-top img-fluid">
          <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1">
            {{ (movie.vote_average * 10).toFixed(2) }}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.overview.slice(0, 200) + "..." }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const cadena = router.currentRoute.value.query.cadena
    
    const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
    const movies = ref([])
    
    const getMoviesBuscador = () => {
            fetch('https://api.themoviedb.org/3/search/movie?query=${cadena}&include_adult=false&language=en-US&page=1', {
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

    // const filter = () => {
    //     orderedMovies.value = results.value.filter(results => {
    //         return results.title.toLowerCase().includes(titleFilter.value.toLowerCase())
    //     })
    // }

    onMounted(() => {
        getMoviesBuscador();
    })


</script>

<style scoped>

</style>