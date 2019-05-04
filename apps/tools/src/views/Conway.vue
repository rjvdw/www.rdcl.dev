<template>
  <div id="conway">
    <p>{{ generations }} generations</p>

    <div class="conway-grid">
      <div
        role="button"
        tabindex="0"
        v-for="cell in cells"
        :class="[ 'conway-grid__cell', `conway-grid__cell--${ cell.state }` ]"
        @click="!running && cell.toggle()"
        @keydown.enter="!running && cell.toggle()"
        @keydown.space="!running && cell.toggle()"
        @keydown.prevent="focus(cell, $event)"
      ></div>
    </div>

    <button :disabled="running" @click="start">Start</button>
    <button :disabled="!running" @click="stop">Stop</button>
    <button :disabled="running" @click="reset">Reset</button>

    <p class="conway-play-speed">
      <label for="play-speed">Speed:</label>
      <input id="play-speed" type="range" min="0" :max="playSpeeds.length - 1" step="1" v-model.number="playSpeedIdx">
      <span>({{ playSpeed }})</span>
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  const NR_COLUMNS = 80
  const NR_ROWS = 40

  class Cell {
    activated: boolean

    constructor(activated = false) {
      this.activated = activated
    }

    toggle() {
      this.activated = !this.activated
    }

    get state(): string {
      return this.activated
        ? 'activated'
        : 'deactivated'
    }

    static getCells(): Cell[] {
      return new Array(NR_COLUMNS * NR_ROWS).fill(null).map(_ => new Cell())
    }
  }

  @Component
  export default class Conway extends Vue {
    cells: Cell[] = Cell.getCells()
    running: number | null = null
    generations: number = 0
    playSpeedIdx: number = 5

    private readonly playSpeeds = [10, 25, 50, 125, 250, 500, 750, 1000, 1500, 2000]

    get playSpeed() {
      return this.playSpeeds[this.playSpeedIdx]
    }

    start() {
      this.generations = 0
      this.run()
    }

    run() {
      this.running = setTimeout(() => this.iter(), this.playSpeed)
    }

    stop() {
      if (this.running !== null)
        clearInterval(this.running)
      this.running = null
    }

    reset() {
      for (const cell of this.cells) {
        cell.activated = false
      }
    }

    iter() {
      this.cells = this.cells.map(Conway.nextGeneration)
      this.generations += 1
      this.run()
    }

    focus(cell: Cell, event: KeyboardEvent) {
      const move = (diff: number) => {
        let idx = this.cells.findIndex(c => c === cell) + diff
        if (idx < 0) idx = 0
        if (idx >= NR_COLUMNS * NR_ROWS) idx = NR_COLUMNS * NR_ROWS

        const target = (<HTMLElement>event.target!)
        const cellToFocus = (<HTMLElement>target.parentElement!.children[idx])
        cellToFocus.focus()
      }

      if (!this.running)
        switch (event.key) {
          case 'ArrowDown':
            move(NR_COLUMNS)
            break
          case 'ArrowUp':
            move(-NR_COLUMNS)
            break
          case 'ArrowLeft':
            move(-1)
            break
          case 'ArrowRight':
            move(1)
            break
        }
    }

    private static nextGeneration(cell: Cell, index: number, cells: Cell[]): Cell {
      const [col, row] = Conway.getCoords(index)
      const neighbours = Conway.getNeighbours(cells, col, row)
      const liveNeighbours = neighbours.filter(cell => cell.activated).length

      if (liveNeighbours < 2 || liveNeighbours > 3)
        return new Cell(false)

      if (liveNeighbours === 3)
        return new Cell(true)

      return cell
    }

    private static getIndex(col: number, row: number): number {
      if (col < 0 || col >= NR_COLUMNS)
        return -1
      if (row < 0 || row >= NR_ROWS)
        return -1
      return row * NR_COLUMNS + col
    }

    private static getCoords(index: number): [number, number] {
      const col = index % NR_COLUMNS
      const row = (index - col) / NR_COLUMNS

      return [col, row]
    }

    private static getNeighbours(cells: Cell[], col: number, row: number): Cell[] {
      return [
        [col - 1, row - 1], [col, row - 1], [col + 1, row - 1],
        [col - 1, row], [col + 1, row],
        [col - 1, row + 1], [col, row + 1], [col + 1, row + 1],
      ]
        .map(([c, r]) => Conway.getIndex(c, r))
        .filter(x => x !== -1)
        .map(i => cells[i])
    }
  }
</script>

<style scoped lang="sass">
  .conway
    &-grid
      display: grid
      align-items: start
      justify-items: start
      background: #000
      width: fit-content
      border: 1px solid #000
      grid:
        template-columns: repeat(80, .5rem)
        column-gap: 1px
        row-gap: 1px

      &__cell
        height: .5rem
        width: .5rem

        &:hover, &:active, &:focus
          outline: 0
          box-shadow: none

        &--deactivated
          background: #eee

        &--activated
          background: #000

        &:focus
          border: 1px solid red

    &-play-speed
      display: flex
      align-items: center
      margin-top: .5rem
</style>
