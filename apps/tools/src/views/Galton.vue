<template>
  <div id="galton">
    <p><em>Word of caution!</em> This tool has not been optimized. It will consume quite some CPU.</p>

    <p>Number of marbles: {{ marblesInTrays.length }}</p>

    <div class="trays">
      <div class="tray-container" v-for="tray in trays">
        <div class="tray">
          <div
            class="marble"
            v-for="marble in tray"
            :style="{ background: marble.color }"
          ></div>
        </div>
        <div class="tray-summary"
             :style="{ background: `rgba(255, 255, 0, ${(+percentageOfMarblesInTray(tray))/25})` }">
          {{ percentageOfMarblesInTray(tray) }}%
        </div>
      </div>
    </div>

    <button :disabled="running" @click="start">Start</button>
    <button :disabled="!running" @click="stop">Stop</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type Color = '#f00' | '#0f0' | '#00f' | '#ff0' | '#f0f' | '#0ff'
  type Mapper<T, V> = (v: T, idx: number, arr: T[]) => V

  class Marble {
    lvl: number = 0
    position: number = 0
    color: Color

    constructor() {
      this.color = randomColor()
    }

    drop() {
      this.lvl += 1
      if (Math.random() < .5) {
        this.position += 1
      }
    }
  }

  @Component
  export default class Galton extends Vue {
    private nrTrays: number = 25
    private marbles: Marble[] = []
    private running: boolean = false
    private marblesPerFrame: number = 10

    get fallingMarbles(): Marble[] {
      return this.marbles.filter(marble => marble.lvl < this.nrTrays)
    }

    get marblesInTrays(): Marble[] {
      return this.marbles.filter(marble => marble.lvl >= this.nrTrays)
    }

    get trays(): Marble[][] {
      return makeArray(
        this.nrTrays,
        (_, idx) => this.marblesInTrays
          .filter(marble => marble.position === idx)
      )
    }

    get maxNrOfMarblesInTrays(): number {
      // 800 = max nr of marbles in one tray
      return 800 * this.nrTrays / 4
    }

    percentageOfMarblesInTray(tray: Marble[]): string {
      const p = this.marblesInTrays.length === 0
        ? 0
        : (tray.length / this.marblesInTrays.length * 100)

      return p.toFixed(2)
    }

    start() {
      this.marbles.length = 0
      this.running = true
      this.iter()
    }

    stop() {
      this.running = false
    }

    iter() {
      this.fallingMarbles.forEach(marble => marble.drop())
      for (let i = 0; i < this.marblesPerFrame; i += 1)
        this.marbles.push(new Marble())
      if (this.marblesInTrays.length >= this.maxNrOfMarblesInTrays)
        this.running = false
      if (this.running)
        requestAnimationFrame(() => this.iter())
    }
  }

  function randomColor(): Color {
    // FIXME: not so much hardcoded stuff?
    const rnd = Math.floor(Math.random() * 6)
    const colors: Color[] = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']
    return colors[rnd]
  }

  function makeArray<T>(length: number, fillMethod: Mapper<null, T>): T[] {
    return Array(length)
      .fill(null)
      .map(fillMethod)
  }
</script>

<style scoped lang="sass">
  #galton
    .trays
      display: flex
      width: calc(25 * 33px + 1px)

    .tray-container
      display: flex
      flex-direction: column
      border:
        bottom: 1px solid black
        left: 1px solid black

      &:last-child
        border-right: 1px solid black

    .tray
      box-sizing: content-box
      display: flex
      flex-wrap: wrap-reverse
      width: 32px
      justify-content: center
      align-content: flex-start
      height: 450px
      overflow: hidden
      border-bottom: 1px solid black

    .tray-summary
      text-align: center
      font-size: .5rem
      overflow: hidden

    .marble
      box-sizing: border-box
      width: 4px
      height: 4px
      border-radius: 50%
      border: 1px solid black
</style>
