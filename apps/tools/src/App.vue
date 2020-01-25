<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="sass">
  @import '@rdcl-dev/shared-styles/src/main.sass'

  nav, main
    max-width: $page-max-width
    margin: 0 auto
    padding: 0

  nav
    margin-bottom: 2rem

  .form-layout
    display: grid
    grid:
      template-columns: max-content 1fr
      column-gap: 1rem
      row-gap: .5rem
    align-items: center

  input:not([type="range"]):not([type="radio"]):not([type="checkbox"])
    width: 100%
    font-size: 1rem
    padding: .25rem
</style>
