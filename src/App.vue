<template>
  <div id="app">
    <navi></navi>
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Navi from './components/Navi'

export default {
  name: 'app',
  components: {
    Hello,
    Navi
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
