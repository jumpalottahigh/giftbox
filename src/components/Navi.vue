<template>
  <header>
    <nav class="navbar navbar-dark bg-primary p-y-1">
      <ul class="nav navbar-nav row">
        <li class="nav-item col-xs-4 col-sm-1 logo-order">
          <a class="navbar-brand logo" href="#">
            <img src="assets/img/logo.png" alt="Georgi Yanev">
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="projects.html"><i class="fa fa-code-fork"></i> Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-toggle="tooltip" data-placement="bottom" title="Coming soon™"><i class="fa fa-suitcase"></i> Portfolio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="docs.html"><i class="fa fa-book"></i> Docs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://blog.georgiyanev.me"><i class="fa fa-paragraph"></i> Blog</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navi',
  data () {
    return {
      msg: 'Navigation here'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-face: 'Roboto';
}
</style>
