<template>

  <div class="row">
    <div class="mx-auto mb-3" v-if="movie">
      <div class="card mb-12">
        <div class="row">
          <div class="col-4">
            <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path" id="imgMovie" class="col-12 card-img-top img-fluid" alt="imgMovie">
          </div>
          <div class="col-8">
            <h4 class="card-tittle mt-3">{{ movie.title }}</h4>
            <p class="card-text">{{ movie.overview }}</p>
            <p class="card-text">Fecha de salida: <span class="text-success">{{ movie.release_date }}</span></p>
            <div v-if="providersmovie.rent">
              <h5>Alquiler</h5>
              <div v-for="provider in providersmovie.rent" :key="provider.id" class="d-inline-block mx-2">
                <img :src="'https://image.tmdb.org/t/p/w1280' + provider.logo_path" class="img-thumbnail" alt="alquiler" id="providersRent">
              </div>
            </div>
            <div v-if="providersmovie.buy">
              <h5 class="mt-3">Compra</h5>
              <div v-for="providere in providersmovie.buy" :key="providere.id" class="d-inline-block mx-2">
                <img :src="'https://image.tmdb.org/t/p/w1280' + providere.logo_path" class="img-thumbnail" alt="compra" id="providersRent">
              </div>
            </div>
            <div class="mt-auto">
              <button type="button" @click="addWatchlist(movie.id)" class="btn btn-outline-primary mt-3" id="mybutton">Añadir a watchlist</button>
            </div>
            <button type="button" class="btn btn-outline-primary mt-2" data-bs-toggle="modal" data-bs-target="#trailerModal">
              Ver Trailer
            </button>

            <!-- <p id="genero">Género</p>
            <ul>
                <li v-for="genreId in movie.genre_ids" :key="genreId">{{ genres.find(genre => genre.id === genreId).name }}</li>
            </ul> -->
          </div>
        </div>
        <span class="position-absolute top-0 start-100 translate-middle d-inline-block rounded-circle bg-success text-white p-1">
          {{ (movie.vote_average).toFixed(2) }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </div>
    </div>
  </div>

  <div class="modal fade" id="trailerModal" tabindex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="trailerModalLabel">Trailer</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="trailerUrl" class="text-center">
            <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + trailerUrl.key" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>


    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <div v-if="castmovie">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#castmovie" type="button" role="tab" aria-controls="castmovie" aria-selected="false">Actores</button>
        </li>
      </div>

      <div v-if="reviewsmovie">
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="reviews" data-bs-toggle="tab" data-bs-target="#review-pane" type="button" role="tab" aria-controls="review-pane" aria-selected="true">Comentarios</button>
        </li>
      </div>
      <div v-if="recommendationsmovie">
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Recomendaciones</button>
        </li>        
      </div>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="castmovie" role="tabpanel" aria-labelledby="review" tabindex="0">
        <div class="row d-flex flex-row mb-3">
          <div v-for="actor in castmovie" :key="actor" class="col-md-3">
            <div class="card mb-3 mt-3">
              <img :src="'https://image.tmdb.org/t/p/w1280' + actor.profile_path" alt="algo" class="img-fluid">
              <div class="card-body">
                <p style="font-weight: bold;">{{ actor.original_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="review-pane" role="tabpanel" aria-labelledby="review" tabindex="0">
        <div v-for="review in reviewsmovie" :key="review" class="mx-3 mt-2">
          <p>Usuario: <span style="font-weight: bold;">{{ review.author }}</span></p>
          <p>{{ review.content }}</p>
        </div>
      </div>
      <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
        <div class="row d-flex flex-row mb-3">
          <div v-for="peli in recommendationsmovie.results" :key="peli.id" class="col-md-3">
            <div class="card mb-3 mt-3">
              <img :src="'https://image.tmdb.org/t/p/w1280' + peli.profile_path" alt="algo" class="img-fluid">
              <div class="card-body">
                <p style="font-weight: bold;">{{ peli.original_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    

  
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";

  const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRlMzI4MzZhYTIxNzIyMjk1OTcxMGFhNGJmYTY1NiIsInN1YiI6IjY1YTkxYmJjNTVjMWY0MDEyODg5ZWE1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7FRPNfYWFgq6giDmM43GaiYUaLSYyLM-6m7kJywMd0')  
  const apikey = ref("41de32836aa217222959710aa4bfa656")
  
  const route = useRoute();
  const movie = ref();
  const providersmovie = ref([]);
  const castmovie = ref([]);
  const reviewsmovie = ref([]);
  const recommendationsmovie = ref([]);
  const genres = ref([]);
  const trailerUrl = ref();
  

  const getMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${apikey}&language=es&page=1&append_to_response=watch/providers,credits,reviews,videos,recommendations`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + bearerToken.value
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json()
      movie.value = data;
      providersmovie.value = data['watch/providers'].results.ES;
      castmovie.value = data.credits.cast;
      reviewsmovie.value = data.reviews.results;
      recommendationsmovie.value = data.recommendations;
      
      
      const trailer = data.videos.results.find(video => video.type === "Trailer");
      if (trailer) {
        trailerUrl.value = trailer;
      }

    } catch (error) {
      console.error('Ocurrió un error en la solicitud', error);
    }
  };

  const getGenres = () => {
    console.log(genres.value)
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
  };

  onMounted(() => {
    getMovieDetails()
    getGenres()
  })



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
  
  

</script>

<style>
  #imgMovie{
    height: 800px;
  }

  #providersRent{
    width: 70px;
  }
</style>