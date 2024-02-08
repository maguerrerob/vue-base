<template>
    <h1>Búsqueda de películas por título</h1>
    <input type="text" placeholder="Filtrar por título" @keyup="">
    <input type="range">

</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    
    const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
    const movies = ref([])
    const getMoviesPopular = () => {
            fetch('https://api.themoviedb.org/3/movie/popular', {
                headers: {
                    'Authorization': 'Bearer ' + bearerToken.value
                }
            })
            .then(response => response.json())
            .then(data => {
                movies.value = data.results
                orderedResults = data.results
            })
        }

    const filter = () => {
        orderedResults.value = results.value.filter(results => {
            return results.vote_average
        })
    }

    onMounted(() => {
        getMoviesPopular();
    })
</script>

<style scoped>

</style>