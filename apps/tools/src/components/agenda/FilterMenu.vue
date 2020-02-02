<template>
  <nav :class="`filters ${ expanded ? 'filters--expanded' : 'filters--collapsed' }`">
    <header class="filters__header">
      <h2 class="filters__title">Filteren</h2>
      <button class="filters__toggle" @click="toggle" @keyup.enter.self="toggle">
        <span class="filters__toggle-inner">⌵</span>
      </button>
    </header>

    <form v-if="expanded" @click.stop>
      <fieldset>
        <legend>Zalen</legend>
        <div class="filters__venues">
          <label
              class="filters__venue"
              v-for="venue in venues"
          >
            <input type="checkbox" v-model="filter.venues[venue]"> {{ venueNames[venue] }}
          </label>
        </div>
      </fieldset>
    </form>
  </nav>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Filter, VENUE_NAMES, Venues } from '@/types/agenda/types'

  @Component
  export default class FilterMenu extends Vue {
    @Prop(Object) private filter!: Filter
    @Prop(Array) private venues!: Venues[]
    @Prop(Boolean) private expanded!: boolean

    // noinspection JSUnusedLocalSymbols
    private readonly venueNames = VENUE_NAMES

    // noinspection JSUnusedLocalSymbols
    private toggle() {
      this.$emit('toggle')
    }
  }
</script>

<style lang="sass">
  @import "styles"

  .filters
    @include card

    &__header
      display: grid
      grid-template-columns: 1fr min-content
      grid-column-gap: 1rem

    &__title
      font-size: 1.1rem
      margin: 0

    &__toggle
      background-color: #ddd
      border: thin solid #333
      border-radius: .25rem
      width: 3rem
      height: 1.5rem
      cursor: pointer
      padding: 0
      margin: 0
      outline: none
      display: flex
      justify-content: center
      align-items: center

    &__toggle-inner
      position: relative
      top: -.25rem
      font-size: 1.25rem
      font-weight: bold
      transition: transform .4s, top .4s

    &--expanded &__toggle-inner
      top: .25rem
      transform: rotate(180deg)

    &__venues
      display: flex
      flex-flow: row wrap
      margin: -.25rem -1.5rem

    &__venue
      margin: .25rem 1.5rem
</style>
