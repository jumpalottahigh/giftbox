<template>
  <div id="app">
    <navigation class="mb-3"></navigation>
    <giftbox class="mb-1"></giftbox>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Giftbox from './components/Giftbox'

export default {
  name: 'app',
  components: {
    Navigation,
    Giftbox
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
