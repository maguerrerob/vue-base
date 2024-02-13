<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="row">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img
            alt="Vue logo"
            class="logo img-fluid nav-item"
            src="./assets/logo.svg"
            width="50"
            height="50"
          />
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link"><RouterLink to="/">Home</RouterLink></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><RouterLink to="/Buscador">Buscador</RouterLink></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><RouterLink to="/Watchlist">Watchlist</RouterLink></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><RouterLink to="/Film">Film</RouterLink></a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView/>
  </main>
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
