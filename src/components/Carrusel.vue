<template>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000" v-for="movie in movies" :key="movie.id">
                <img :src="'https://image.tmdb.org/t/p/w780' + movie.backdrop_path" class="d-block w-100 imagencarrusel" alt="">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const bearerToken = ref('41de32836aa217222959710aa4bfa656')
    const movies = ref([])
    const getMoviesCarruselApi = () => {
        fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': 'Bearer ' + bearerToken.value
            }
        })
        .then(response => response.json())
        .then(data => movies.value = data.results.slice(0,3))
    }

    onMounted(() => {
        getMoviesCarruselApi();
    })
</script>

<style scoped>

</style>