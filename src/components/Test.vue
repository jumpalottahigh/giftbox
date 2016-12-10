<template lang="html">
  <div class="test col-xs-12">
    <h2>Hi there, {{name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      name: 'Georgi'
    }
  }
}
</script>

<style lang="css" scoped>
div {
  background-color: orangered;
}
</style>
