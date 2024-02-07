<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header class="row">
      <img
        alt="Vue logo"
        class="logo col-2"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />
      <nav class="col-10">
        <a><RouterLink to="/">Home</RouterLink></a>
        <a><RouterLink to="/Buscador">Buscador</RouterLink></a>
        <a><RouterLink to="/Film">Film</RouterLink></a>
        <a><RouterLink to="/Watchlist">Watchlist</RouterLink></a>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
