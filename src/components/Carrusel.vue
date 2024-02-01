<template>
    <div class="carrusel">
        <img id="movieImage" src="" alt="Movie Image">
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
    const movies = ref([])
    const getMoviesCarruselApi = () => {
        fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': 'Bearer ' + bearerToken.value
            }
        })
        .then(response => response.json())
        .then(data => movies.value = data.results)
    }
    const currentIndex = ref(0);
    const movieImage = ref(document.getElementById('movieImage'));

    const currentImage = computed(() => movies[currentIndex.value]);

    onMounted(() => {
        setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % movies.length;
        }, 5000);
    });
</script>

<style scoped>
    .carrusel {
        width: 400px;
        height: 300px;
        overflow: hidden;
        margin: 0 auto;
    }

    #movieImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>