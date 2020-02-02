<template>
  <nav
      :class="`filters ${ expanded ? 'filters--expanded' : 'filters--collapsed' }`"
      @click="toggle"
      @keyup.enter.self="toggle"
      tabindex="0"
  >
    <header class="filters__header">
      <h2 class="filters__title">Filteren</h2>
    </header>

    <form v-if="expanded">
      <section class="filters__section">
        <h3 class="filters__section-header">Zalen</h3>
        <div class="filters__venues">
          <label
              @click.stop
              class="filters__venue"
              v-for="venue in venues"
          >
            <input type="checkbox" v-model="filter.venues[venue]"> {{ venueNames[venue] }}
          </label>
        </div>
      </section>

      <section class="filters__section">
        <h3 class="filters__section-header">Sortering</h3>

        <label @click.stop>
          Sorteer op
          <select v-model="filter.ordering">
            <option value="date ascending">Datum (oplopend)</option>
            <option value="date descending">Datum (aflopend)</option>
            <option value="price ascending">Prijs (oplopend)</option>
            <option value="price descending">Prijs (aflopend)</option>
          </select>
        </label>
      </section>
    </form>
  </nav>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Filter, ORDERINGS, VENUE_NAMES, Venues } from '@/types/agenda/types'

  @Component
  export default class FilterMenu extends Vue {
    @Prop(Object) private filter!: Filter
    @Prop(Array) private venues!: Venues[]
    @Prop(Boolean) private expanded!: boolean

    // noinspection JSUnusedLocalSymbols
    private readonly venueNames = VENUE_NAMES

    // noinspection JSUnusedLocalSymbols
    private readonly orderings = ORDERINGS

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

    &__venues
      display: flex
      flex-flow: row wrap
      margin: -.25rem -1rem

    &__venue
      margin: .25rem 1rem

    &__section-header
      font-size: 1rem
      border-bottom: thin solid #aaa
      margin: 0 0 .5rem
      padding: 0

    &__section
      border: thin solid #aaa
      padding: .5rem
      margin-top: 1rem
</style>
