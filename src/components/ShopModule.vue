<template>
  <div class="subject-wrapper">
    <div class="subject-title">{{subjectName}}</div>

    <div class="modules-wrapper">
      <RecentModule
        v-for="module in modules"
        v-bind:key="module.moduleId"
        v-bind:module="module"
        v-bind:title="module.title"
        v-bind:wordsInModule="module.wordsInModule"
        v-bind:words="module.words"
        v-bind:id="module.moduleId">
      </RecentModule>
    </div>
  </div>
</template>

<script>
  import RecentModule from './RecentModule'
  import ShopModule from './ShopModule'

  export default {
    name: "ShopModule",
    props: ['modules', 'subjectName', 'id'],
    components: {
      RecentModule,
      ShopModule
    }
  }
</script>

<style scoped>
  .subject-title {
    margin-top: 10px;
    color: #2095a6;
    font-size: 15px;
    text-align: left;
    padding-left: 30px;
    margin-bottom: 5px;
  }
</style>
