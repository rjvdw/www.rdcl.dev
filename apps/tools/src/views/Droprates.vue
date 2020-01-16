<template>
  <form>
    <table>
      <tr>
        <td><label for="droprate">Drop rate</label></td>
        <td>
          <input
            id="droprate"
            v-model.number="droprate"
            autofocus
            inputmode="decimal"
          >%
        </td>
        <td></td>
      </tr>

      <tr>
        <td><label for="nrattempts">Nr. of attempts</label></td>
        <td>
          <input
            id="nrattempts"
            v-model.number="nrattempts"
            inputmode="decimal"
          >
        </td>
        <td></td>
      </tr>

      <tr>
        <td class="separator" colspan="2">&nbsp;</td>
      </tr>

      <tr>
        <td colspan="2">&nbsp;</td>
      </tr>

      <tr>
        <td><label for="chance">Chance</label></td>
        <td>
          <input
            id="chance"
            readonly
            :value="chance(droprate, nrattempts)"
          >%
        </td>
      </tr>

      <tr>
        <td><label for="perc95">95%</label></td>
        <td>
          <input
            id="perc95"
            readonly
            :value="percentile(droprate, 95)"
          >
        </td>
      </tr>

      <tr>
        <td><label for="perc99">99%</label></td>
        <td>
          <input
            id="perc99"
            readonly
            :value="percentile(droprate, 99)"
          >
        </td>
      </tr>
    </table>
  </form>
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
  td.separator
    border-bottom: thin solid #333
</style>
