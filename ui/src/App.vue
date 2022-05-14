<script>
import Navbar from './components/Navbar.vue'
import Tab from './components/Tab.vue'
import Explore from './components/Explore.vue'

export default {
  components: {
    Navbar,
    Tab,
    Explore
  },
  data() {
    return {
      toolbar: false
    }
  }
}
</script>

<template>
  <Navbar :toolbar="toolbar" />

  <router-view @toolbar="(e) => toolbar = e"></router-view>

</template>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
@import './assets/main.css';
</style>
