<template>
  <div id="lingo">
    <p :class="[ 'message', `message--${ message.type }` ]">
      {{ message.msg }}
    </p>

    <table>
      <tr v-for="guess in guesses">
        <td v-for="letter in guess" :class="letter.class">
          {{ letter.value }}
        </td>
      </tr>
    </table>

    <form @submit.prevent="guess">
      <input
        autocapitalize="off"
        type="text"
        ref="currentGuess"
        autofocus
        v-model="currentGuess"
        :disabled="gameOver"
      >
      <button :disabled="gameOver">Raad</button>
    </form>

    <button @click="init">Reset</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  const NR_LETTERS = 6
  const NR_GUESSES = 6

  type Message = { type: 'none' } | {
    type: 'error' | 'success',
    msg: string,
  }

  type Letter = {
    value: string | null,
    class: '' | 'correct' | 'maybe',
  }

  type Guess = Letter[]

  @Component
  export default class Lingo extends Vue {
    private static wordList: string[] | null = null
    private static dictionary: Set<string> | null = null

    wordToGuess: string | null = null
    guessNumber: number = 0
    currentGuess: string = ''
    guesses: Guess[] = []
    gameOver: boolean = true
    message: Message = { type: 'none' }
    correctSoFar: Letter[] = []

    notify(type: 'error' | 'success', msg: string) {
      this.message = { type, msg }
    }

    clearNotification() {
      this.message = { type: 'none' }
    }

    private static async fillWordList() {
      const response = await fetch('/tools/data/woordenlijst.txt')
      const body = await response.text()

      Lingo.wordList = body.replace(/^[\r\n]+|[\r\n]+$/g, '').split(/[\r\n]+/)
      Lingo.dictionary = new Set(Lingo.wordList)
    }

    private static getRandomWord(): string {
      const wordList = Lingo.wordList!
      const idx = Math.floor(wordList.length * Math.random())
      return wordList[idx]
    }

    private static isValidGuess(word: string): boolean {
      return Lingo.dictionary!.has(word)
    }

    private static analyse(word: string) {
      const initial: { [key: string]: number } = {}
      return word.split('').reduce((p, v) => {
        if (p[v] === undefined) p[v] = 0
        p[v] += 1
        return p
      }, initial)
    }

    async init() {
      if (Lingo.wordList === null) {
        await Lingo.fillWordList()
      }

      this.clearNotification()
      this.guessNumber = 0
      this.currentGuess = ''

      this.guesses.length = 0
      for (let i = 0; i < NR_GUESSES; i += 1) {
        const letters: Letter[] = []
        for (let j = 0; j < NR_LETTERS; j += 1) {
          letters.push({ value: null, class: '' })
        }
        this.guesses.push(letters)
      }

      this.correctSoFar.length = 0
      for (let i = 0; i < NR_LETTERS; i += 1) {
        this.correctSoFar.push({ value: null, class: '' })
      }

      this.wordToGuess = Lingo.getRandomWord()
      this.guesses[0][0] = { value: this.wordToGuess![0], class: 'correct' }
      this.correctSoFar[0] = { value: this.wordToGuess![0], class: 'correct' }
      this.gameOver = false
      this.focus()
    }

    async focus() {
      await this.$nextTick()
      const currentGuess = (<HTMLElement>this.$refs.currentGuess)
      currentGuess.focus()
    }

    guess() {
      if (this.gameOver) return

      this.clearNotification()

      if (!this.currentGuess) {
        this.focus()
        return
      }

      if (!Lingo.isValidGuess(this.currentGuess)) {
        this.notify('error', 'Geen geldig woord!')
        this.focus()
        return
      }

      const currentGuess = this.currentGuess
      this.currentGuess = ''
      const guess = this.guesses[this.guessNumber]
      const meta = Lingo.analyse(this.wordToGuess!)

      for (let i = 0; i < NR_LETTERS; i += 1) {
        guess[i].value = currentGuess[i]

        if (currentGuess[i] === this.wordToGuess![i]) {
          guess[i].class = 'correct'
          this.correctSoFar[i].value = currentGuess[i]
          this.correctSoFar[i].class = 'correct'
          meta[currentGuess[i]] -= 1
        }
      }

      for (let i = 0; i < NR_LETTERS; i += 1) {
        if (currentGuess[i] !== this.wordToGuess![i] && meta[currentGuess[i]]) {
          guess[i].class = 'maybe'
          meta[currentGuess[i]] -= 1
        }
      }

      if (currentGuess === this.wordToGuess) {
        this.notify('success', 'Correct!')
        this.gameOver = true
        return
      }

      this.guessNumber += 1
      if (this.guessNumber === NR_GUESSES) {
        this.notify('error', `Helaas! Het woord was "${ this.wordToGuess }".`)
        this.gameOver = true
        return
      }

      const nextGuess = this.guesses[this.guessNumber]
      for (let i = 0; i < NR_LETTERS; i += 1) {
        if (this.correctSoFar[i].class) {
          nextGuess[i].value = this.correctSoFar[i].value
          nextGuess[i].class = this.correctSoFar[i].class
        }
      }

      this.focus()
    }

    beforeMount() {
      this.init()
    }
  }
</script>

<style scoped lang="sass">
  #lingo
    text-align: center

    .message
      background-color: #cce5ff
      border: thin solid #b8daff
      border-radius: .25rem
      color: #004085
      padding: .75rem 1.25rem
      margin: 0 0 .75rem
      line-height: 1.3rem
      height: calc(1.3rem + 2 * (1px + .75rem))

      &--none
        visibility: hidden

      &--success
        background-color: #d4edda
        border-color: #c3e6cb
        color: #155724

      &--error
        background-color: #f8d7da
        border-color: #f5c6cb
        color: #721c24

    table
      border-spacing: 0
      border-collapse: collapse
      margin: auto

    td
      border: thin solid #333
      width: 2.5rem
      line-height: 2.5rem
      height: 2.5rem
      margin: 0
      padding: 0
      text-align: center

      &.correct
        background-color: #393

      &.maybe
        background-color: #ff0

    input
      font-size: 1rem
      width: initial
      padding: initial

</style>
