<template>
  <header>
    <nav class="navbar navbar-dark bg-primary p-y-1">
      <ul class="nav navbar-nav row">
        <!-- This will be done with Vue Router later -->
        <li class="nav-item col-xs-4 col-sm-1 logo-order">
          <a class="navbar-brand logo" href="#">
            <img src="https://placehold.it/32x32.png" alt="Georgi Yanev">
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{{navLinks[0].text}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{{navLinks[1].text}}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      navLinks: [
        {
          text: 'Link1',
          url: '#'
        },
        {
          text: 'Link2',
          url: '#'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
