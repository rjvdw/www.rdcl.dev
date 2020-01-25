<template>
  <div>
    <h1>HTML Demos</h1>

    <h2>Input Modes</h2>

    <div class="form-layout">
      <template v-for="inputmode in inputmodes">
        <label style="font-family:monospace" :for="`inputmode-${ inputmode }`">inputmode="{{ inputmode }}"</label>
        <input :id="`inputmode-${ inputmode }`" type="text" :inputmode="inputmode">
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Html extends Vue {
    inputmodes = [
      'none',
      'numeric', 'decimal',
      'tel', 'email', 'url',
      'search',
    ]
  }
</script>

<style scoped lang="sass">
</style>
