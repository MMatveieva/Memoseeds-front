<template>

</template>

<script>
  import Header from './Header'

  export default {
    name: "SearchResults",
    components: {
      Header
    },
    data() {
      return {
        modules: []
      }
    },
    created() {
      this.modules = Header.data().modules;
    }
  }
</script>

<style scoped>

</style>
