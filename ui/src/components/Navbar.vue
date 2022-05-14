<script>
import Toolbar from "./Toolbar.vue"

export default {
  components: {
    Toolbar
  },
  props: {
    toolbar: Boolean
  }
}
</script>

<template>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark p-2">
    <router-link to="/" class="logo"><i class="bi bi-soundwave"></i></router-link>
    <router-link to="/" class="navbar-brand">Tsunami Tabs</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/explore" class="nav-link">Explore</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">Signup</router-link>
        </li>
      </ul>
      <Toolbar v-if="toolbar" />
      <form class="form-inline mt-2 mb-0 my-xl-0 ms-auto">
        <input class="form-control me-sm-2" type="search" placeholder="Search for tabs..." aria-label="Search">
      </form>
    </div>
  </nav>

</template>

<style>
.logo {
  padding-right: 16px;
  font-size: 40px;
  line-height: 0;
  color: white;
}

.logo:hover {
  color: white;
}
</style>