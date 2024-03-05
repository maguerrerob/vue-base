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
                            <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
                        </ul>
                        <button type="button" @click="delWatchlist" class="btn btn-outline-primary" id="mybutton">Remove</button><span></span>
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
    const getMoviesWatchlist = () => {
        fetch('https://api.themoviedb.org/3/account/20931000/watchlist/movies?language=es-US&page=1&sort_by=created_at.asc', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + bearerToken.value
            }
        })
        .then(response => response.json())
        .then(data => watchlist.value = data.results)
    }

    onMounted(() => {
        getMoviesWatchlist();
    })

    const delWatchlist = () => {

    }

    const genres: ref([
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ])
</script>

<style lang="scss" scoped>
    #mybutton{
        position: absolute;
        top: 83%;
    }

    #genero{
        font-weight: bold;
    }
</style>