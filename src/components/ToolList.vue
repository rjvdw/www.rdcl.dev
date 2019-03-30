<template lang="pug">
  ul
    slot
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class ToolList extends Vue {
  }
</script>
