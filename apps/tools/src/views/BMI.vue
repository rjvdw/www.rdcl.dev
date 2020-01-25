<template>
  <div class="form-layout">
    <label for="weight">Weight (in kgs)</label>
    <input
        id="weight"
        type="number"
        inputmode="decimal"
        :value="formatted(weight)"
        @input="$event.target.value && weightUpdated(+$event.target.value)"
        @change="weightUpdated(+$event.target.value)"
        step="any"
    >

    <label for="height">Height (in cms)</label>
    <input
        id="height"
        type="number"
        inputmode="decimal"
        v-model.number="height"
        step="any"
    >

    <label for="bmi">BMI</label>
    <input
        id="bmi"
        type="number"
        inputmode="decimal"
        :value="formatted(bmi)"
        @input="$event.target.value && bmiUpdated(+$event.target.value)"
        @change="bmiUpdated(+$event.target.value)"
        step="any"
    >
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class BMI extends Vue {
    weight: number
    height: number

    get bmi(): number {
      return this.weight / this.cHeight
    }

    constructor() {
      super()

      this.weight = readValue('bmi:weight', 75)
      this.height = readValue('bmi:height', 185)
    }

    @Watch('weight')
    private onWeightChanged(value: number) {
      writeValue('bmi:weight', value)
    }

    @Watch('height')
    private onHeightChanged(value: number) {
      writeValue('bmi:height', value)
    }

    weightUpdated(weight: number) {
      this.weight = weight
    }

    bmiUpdated(bmi: number) {
      this.weight = bmi * this.cHeight
    }

    formatted(value: number): number {
      return Number(value.toFixed(2))
    }

    private get cHeight(): number {
      return (this.height / 100) ** 2
    }
  }

  function readValue(key: string, dflt: number): number {
    const value = localStorage.getItem(key)

    return value ? +value : dflt
  }

  function writeValue(key: string, value: number) {
    localStorage.setItem(key, "" + value)
  }
</script>

<style scoped lang="sass">
</style>
