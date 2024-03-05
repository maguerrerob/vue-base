<template>
  <div class="container">
    <div v-if="movie">
      <h1>Detalles de película {{ movie.title }}</h1>
    </div>
    <div class="row" v-else>
      <p class="alert alert-danger">No se ha encontrado la película</p>
    </div>
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
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${$route.params.id}?api_key=`+apikey+`&append_to_response=watch/providers,credits,reviews,videos,recommendations`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + bearerToken.value
          }
        }
      );

      const data = await response.json();
      movie.value = data;

      const trailerVideo = data.videos.results.find(video => video.type === "Trailer");

      if (trailerVideo) {
          const keytrailer = trailerVideo.key;
          trailerUrl.value = `https://www.youtube.com/embed/${keytrailer}`;
          console.log(trailerUrl.value)

      } else {
          console.error("La película no tiene trailer");
      }

      reviewsmovie.value = data.reviews.results
      castmovie.value = data.credits.cast
      providersmovie.value = data['watch/providers'].results.ES;
      recommendationsmovie.value = data.recommendations.results

      if (!response.ok) {
        throw new Error('Hubo un error en la solicitud a la API');
      }

    } catch (error) {
      console.error('Error al recuperar los datos:', error);
    }
  });

  onUpdated(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${$route.params.id}?api_key=`+apikey+`&append_to_response=watch/providers,credits,reviews,videos,recommendations`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + bearerToken.value
          }
        }
      );

      const data = await response.json();
      movie.value = data;

      const trailerVideo = data.videos.results.find(video => video.type === "Trailer");

      if (trailerVideo) {
          const keytrailer = trailerVideo.key;
          trailerUrl.value = `https://www.youtube.com/embed/${keytrailer}`;
          console.log(trailerUrl.value)

      } else {
          console.error("La película no tiene trailer");
      }

      reviewsmovie.value = data.reviews.results
      castmovie.value = data.credits.cast
      providersmovie.value = data['watch/providers'].results.ES;
      recommendationsmovie.value = data.recommendations.results

      if (!response.ok) {
        throw new Error('Hubo un error en la solicitud a la API');
      }

    } catch (error) {
      console.error('Error al recuperar los datos:', error);
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