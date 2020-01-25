<template>
  <div class="form-layout droprate-calculator">
    <label class="first-label" for="droprate">Drop rate</label>
    <input
        id="droprate"
        v-model.number="droprate"
        autofocus
        inputmode="decimal"
    >
    <label for="droprate">%</label>

    <label class="first-label" for="nrattempts">Nr. of attempts</label>
    <input
        id="nrattempts"
        v-model.number="nrattempts"
        inputmode="decimal"
    >
    <div></div>

    <div class="separator"></div>

    <label class="first-label" for="chance">Chance</label>
    <input
        id="chance"
        readonly
        :value="chance(droprate, nrattempts)"
    >
    <label for="droprate">%</label>

    <label class="first-label" for="perc95">95%</label>
    <input
        id="perc95"
        readonly
        :value="percentile(droprate, 95)"
    >
    <div></div>

    <label class="first-label" for="perc99">99%</label>
    <input
        id="perc99"
        readonly
        :value="percentile(droprate, 99)"
    >
    <div></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Droprates extends Vue {
    droprate = 1
    nrattempts = 100

    chance(droprate: number, nrattempts: number): number | string {
      const p = droprate / 100
      const n = Math.round(nrattempts)

      if (n === 0) return 0

      const c = 100 - 100 * Math.pow(1 - p, n)
      return c.toFixed(2)
    }

    percentile(droprate: number, percentile: number): number | string {
      const p = droprate / 100
      return this.computePercentile(p, percentile / 100)
    }

    private computePercentile(p: number, percentile: number): number | string {
      if (p === 0) return '∞'

      let lower = 0
      let upper = Number.MAX_SAFE_INTEGER
      let res

      do {
        res = Math.floor((lower + upper) / 2)
        if (1 - Math.pow(1 - p, res) < percentile) {
          lower = res
        } else {
          upper = res
        }
      } while (lower < upper - 1)

      return res
    }
  }
</script>

<style scoped lang="sass">
  .form-layout.droprate-calculator
    grid:
      template-columns: max-content 1fr max-content
      column-gap: 0

  .separator
    grid-column: span 3
    border-bottom: thin solid #333
    margin: .5rem 0

  .first-label
    margin-right: 1rem
</style>
