<template>
    <h3>My Watchlist</h3>
    <div class="row">
        <div class="col-9 mx-auto mb-3" v-for="movie in watchlist" :key="movie.id">
            <div class="card mb-12">
                <div class="row">
                    <div class="col-2">
                        <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" class="col-12 card-img-top img-fluid" alt="">
                    </div>
                    <div class="col-10">
                        <h5 class="card-tittle mt-3">{{ movie.title }}</h5>
                        <p class="card-text">{{ movie.overview }}</p>
                        <p class="card-text">Fecha de salida: <span class="text-success">{{ movie.release_date }}</span></p>
                        <p id="genero">Género</p>
                        <ul>
                            <li v-for="genreId in movie.genre_ids" :key="genreId">{{ genres.find(genre => genre.id === genreId).name }}</li>
                        </ul>
                        <div class="mb-1">
                            <router-link :to="{ name: 'Movie', params: { id: movie.id }}" class="btn btn-primary me-2">Detalles</router-link>
                            <button type="button" @click="delWatchlist(movie.id)" class="btn btn-outline-primary" id="mybutton">Borrar</button><span></span>
                        </div>
                    </div>
                </div>
                <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1">
                    {{ (movie.vote_average).toFixed(2) }}
                    <span class="visually-hidden">unread messages</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted} from 'vue'

    const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
    const watchlist = ref([])
    const genres = ref([]);

    const getMoviesWatchlist = () => {
        fetch('https://api.themoviedb.org/3/account/20931000/watchlist/movies?language=es-US&page=1&sort_by=created_at.asc', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + bearerToken.value
            }
        })
        .then(response => response.json())
        .then(data => {
            watchlist.value = data.results;
            // Obtenemos los géneros
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=es-US', {
                headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + bearerToken.value
                }
            })
            .then(response => response.json())
            .then(data => {
                genres.value = data.genres;
            })
        })
    }

    onMounted(() => {
        getMoviesWatchlist();
    })

    function delWatchlist(movieId){
        fetch(`https://api.themoviedb.org/3/account/20931000/watchlist`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + bearerToken.value
            },
            body: JSON.stringify({media_type: 'movie', media_id: movieId, watchlist: false})
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.reload();
        })
        .catch(err => console.error(err));
    }


</script>

<style lang="scss" scoped>
    

    #genero{
        font-weight: bold;
    }
</style>