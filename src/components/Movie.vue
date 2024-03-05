<template>
  <p>{{ $route.params.id }}</p>
  <div v-if="movie" class="container">
    <h1>Detalles de película {{ movie.title }}</h1>
  </div>
  
</template>

<script>
  import { ref, onMounted, onUpdated } from 'vue';
  import { useRoute } from "vue-router";

  const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')
  
  const apikey = ref("41de32836aa217222959710aa4bfa656")
  
  const $route = useRoute();
  const movie = ref();
  const providersmovie = ref([]);
  const castmovie = ref([]);
  const reviewsmovie = ref([]);
  const recommendationsmovie = ref([]);
  const trailerUrl = ref('');

  onMounted(async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0'
        }
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${$route.params.id}?api_key=41de32836aa217222959710aa4bfa656&append_to_response=watch/providers,credits,reviews,videos,recommendations`,
        
        options
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      movie.value = data;
      providersmovie.value = data['watch/providers'].results.ES;
      castmovie.value = data.credits.cast
      reviewsmovie.value = data.reviews.results
      recommendationsmovie.value = data.recommendations.results
      
      
      const trailerVideo = data.videos.results.find(video => video.type === "Trailer");
          if (trailerVideo) {
              const keytrailer = trailerVideo.key;
              trailerUrl.value = `https://www.youtube.com/embed/${keytrailer}`;
              console.log(trailerUrl.value)

          } else {
              console.error("No se encontró el tráiler de la película.");
          }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
});

  onUpdated(async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0'
        }
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${$route.params.id}?api_key=41de32836aa217222959710aa4bfa656&append_to_response=watch/providers,credits,reviews,videos,recommendations`,
        
        options
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      movie.value = data;
      providersmovie.value = data['watch/providers'].results.ES;
      castmovie.value = data.credits.cast
      reviewsmovie.value = data.reviews.results
      recommendationsmovie.value = data.recommendations.results
      
      
      const trailerVideo = data.videos.results.find(video => video.type === "Trailer");
          if (trailerVideo) {
              const keytrailer = trailerVideo.key;
              trailerUrl.value = `https://www.youtube.com/embed/${keytrailer}`;
              console.log(trailerUrl.value)

          } else {
              console.error("No se encontró el tráiler de la película.");
          }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });

  function addWatchlist(){
    fetch(`https://api.themoviedb.org/3/account/20931000/watchlist`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer ' + bearerToken.value
        },
        body: JSON.stringify({media_type: 'movie', media_id: movie.value.id, watchlist: true})
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        window.location.reload();
    })
    .catch(err => console.error(err));
  }

  const stopVideo = () => {
    const iframe = document.querySelector('iframe');
    const iframeSrc = iframe.src;
    iframe.src = iframeSrc;
  }

</script>

<style>

</style>