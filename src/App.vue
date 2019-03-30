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
  @import "@/styles/main.sass"

  nav, main
    max-width: $page-max-width
    margin: 0 auto
    padding: 0

  nav
    margin-bottom: 2rem
</style>
