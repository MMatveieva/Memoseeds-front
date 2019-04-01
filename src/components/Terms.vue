<template>
  <div class="words-form row">
    <div class="col-sm-1 module-words-inside word-num">
      <div>{{pos}}</div>
    </div>
    <div class="col-sm-5 module-words-inside word" id="words">
      <div>{{word}}</div>
    </div>
    <div class="col-sm-6 module-words-inside word-def" id="definition">
      <div>{{definition}}</div>
    </div>
  </div>
</template>

<script>
  import Terms from './Terms'

  export default {
    name: "Terms",
    props: ['pos', 'id', 'word', 'definition'],
    components: {
      Terms
    },
  }
</script>

<style scoped>
  .words-form {
    width: 70%;
    margin: auto;
  }

  .word-num, .word, .word-def {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
  }

  .words-form .word-num {
    color: #12496d;
    padding-right: 0;
    text-align: center;
  }

  .words-form .word {
    text-align: left;
  }

  .words-form .word-def {
    text-align: right;
    padding-right: 50px;
  }

  .module-words-inside {
    background: #eeeeee;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .module-words-inside h4 {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #12496d;
  }

</style>
