<style lang="scss" src="./assets/sass/app.scss"></style>

<script>
import FormNote from './components/FormNote'
import Navbar from './components/Navbar'

export default {
  components: {
    FormNote,
    Navbar
  },

  methods: {}
}
</script>

<template>
  <div class="wrapper">
    <navbar></navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>