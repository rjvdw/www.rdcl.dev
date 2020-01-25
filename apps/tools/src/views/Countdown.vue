<template>
  <div>
    <form @submit.prevent="compute">
      <section class="form-section form-section--inputs">
        <label for="nr1">Numbers:</label>
        <input v-model.number="numbers[0]" type="number" inputmode="numeric" min="1" max="100" id="nr1" required
               autofocus>
        <input v-model.number="numbers[1]" type="number" inputmode="numeric" min="1" max="100" id="nr2" required>
        <input v-model.number="numbers[2]" type="number" inputmode="numeric" min="1" max="100" id="nr3" required>
        <input v-model.number="numbers[3]" type="number" inputmode="numeric" min="1" max="100" id="nr4" required>
        <input v-model.number="numbers[4]" type="number" inputmode="numeric" min="1" max="100" id="nr5" required>
        <input v-model.number="numbers[5]" type="number" inputmode="numeric" min="1" max="100" id="nr6" required>
      </section>

      <section class="form-section form-section--target">
        <label for="target">Target:</label>
        <input v-model.number="target" type="number" inputmode="numeric" min="100" max="999" id="target" required>
      </section>

      <button :disabled="computing">Go!</button>
    </form>

    <p v-if="computing">
      Working...
    </p>

    <ul v-if="answer">
      <li v-for="line in answer">
        {{ line[0] }}({{ line[1] }}, {{ line[2] }}) &rarr; {{ line[3] }}
      </li>
    </ul>

    <p v-if="noAnswer">
      This one is impossible
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type Operation = (n1: number, n2: number) => number | null
  type Step = [string, number, number, number]

  @Component
  export default class Countdown extends Vue {
    private readonly operations: { [key: string]: Operation } = {
      add(n1: number, n2: number): number {
        return n1 + n2
      },
      multiply(n1: number, n2: number): number {
        return n1 * n2
      },
      subtract(n1: number, n2: number): number {
        return (n1 > n2) ? (n1 - n2) : (n2 - n1)
      },
      divide(n1: number, n2: number): number | null {
        if (n1 > 0 && n2 % n1 === 0) return n2 / n1
        if (n2 > 0 && n1 % n2 === 0) return n1 / n2
        return null
      },
    }

    numbers: number[] = []
    target: number | null = null
    answer: Step[] | null = null
    noAnswer = false
    computing = false

    compute() {
      // FIXME: make this method async

      this.computing = true

      try {
        if (this.target !== null) {
          this.answer = this.solve(this.target, this.numbers)
          this.noAnswer = this.answer === null
        }
      } finally {
        this.computing = false
      }
    }

    private solve(target: number, numbers: number[]): Step[] | null {
      const size = numbers.length
      if (size === 1) return null

      for (let i = 0; i < size - 1; i += 1) {
        for (let j = i + 1; j < size; j += 1) {
          const n1 = numbers[i]
          const n2 = numbers[j]
          const reduced = numbers
            .slice(0, i)
            .concat(numbers.slice(i + 1, j))
            .concat(numbers.slice(j + 1))
          reduced.length += 1

          for (const key in this.operations) {
            const operation = this.operations[key]
            const result = operation(n1, n2)

            if (result === null) {
              continue
            }

            const answer: Step = [key, n1, n2, result]

            if (result === target) {
              return [answer]
            }

            reduced[size - 2] = result
            const answers = this.solve(target, reduced)

            if (answers !== null) {
              answers.unshift(answer)
              return answers
            }
          }
        }
      }

      return null
    }
  }
</script>

<style scoped lang="sass">
  .form-section--inputs
    display: grid
    grid:
      column-gap: .5rem
      template-columns: repeat(6, 1fr)
    margin-bottom: 1rem
    label
      grid-column: span 6

  .form-section--target
    display: flex
    flex-direction: column
    input
      max-width: 12rem
</style>
