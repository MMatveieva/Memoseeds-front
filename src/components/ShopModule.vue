<template>
  <div class="subject-wrapper">
    <div class="subject-title">{{subjectName}}</div>

    <div class="modules-wrapper">
      <SubjectModule
        v-for="module in modules"
        v-bind:key="module.moduleId"
        v-bind:module="module"
        v-bind:title="module.title"
        v-bind:wordsInModule="module.wordsInModule"
        v-bind:words="module.words"
        v-bind:moduleId="module.moduleId">
      </SubjectModule>
    </div>
  </div>
</template>

<script>
  import SubjectModule from './SubjectModule'
  import ShopModule from './ShopModule'

  export default {
    name: "ShopModule",
    props: ['modules', 'subjectName', 'id'],
    components: {
      SubjectModule,
      ShopModule
    }
  }
</script>

<style scoped>
  .subject-title {
    margin-top: 10px;
    color: #2095a6;
    font-size: 20px;
    text-align: left;
    padding-left: 30px;
    margin-bottom: 5px;
  }
</style>
