<template>
  <nav
      :class="`filters ${ expanded ? 'filters--expanded' : 'filters--collapsed' }`"
      @click="toggle"
      @keyup.enter.self="toggle"
      tabindex="0"
  >
    <h2 class="filters__header">Filteren</h2>

    <form v-if="expanded" @click.stop>
      <fieldset>
        <legend>Zalen</legend>
        <label
            v-for="venue in venues"
        >
          <input type="checkbox" v-model="filter.venues[venue]"> {{ venueNames[venue] }}
        </label>
      </fieldset>
    </form>
  </nav>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Filter, Venues } from '@/types/agenda/types'

  @Component
  export default class FilterMenu extends Vue {
    @Prop(Object) private filter!: Filter
    @Prop(Array) private venues!: Venues[]
    @Prop(Boolean) private expanded!: boolean

    // noinspection JSUnusedLocalSymbols
    private readonly venueNames: { [venue in Venues]: string } = {
      [Venues.DOORNROOSJE]: 'Doornroosje',
    }

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
      font-size: 1.1rem
      margin: 0
</style>
