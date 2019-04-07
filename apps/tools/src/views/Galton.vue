<template>
  <div id="galton">
    <canvas ref="galton-board"></canvas>

    <button :disabled="generateNewMarbles" @click="start">Start</button>
    <button :disabled="!generateNewMarbles" @click="stop">Stop</button>
    <button @click="reset">Reset</button>

    <p class="play-speed">
      <label for="play-speed">Speed:</label>
      <input id="play-speed" type="range" min="0" :max="playSpeeds.length - 1" step="1" v-model.number="playSpeedIdx">
      <span>({{ playSpeed }})</span>
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type Color = '#f00' | '#0f0' | '#00f' | '#ff0' | '#f0f' | '#0ff'

  class Marble {
    row: number
    idx: number
    color: Color

    constructor(row = 0, idx = 0, color?: Color) {
      this.row = row
      this.idx = idx

      if (color === undefined) {
        const colors: Color[] = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      } else {
        this.color = color
      }
    }

    drop() {
      return new Marble(
        this.row + 1,
        this.idx + (Math.random() < .5 ? 0 : 1),
        this.color
      )
    }
  }

  type Tray = number

  @Component
  export default class Galton extends Vue {
    private readonly width: number = 400
    private readonly height: number = 450
    private readonly trayHeight: number = 250
    private readonly pegRowHeight: number = 8
    private readonly topPadding: number = 5
    private readonly pegSize: number = 1
    private readonly marbleRadius: number = 2
    private readonly nrTrays: number = 25
    private generateNewMarbles: boolean = false
    playSpeedIdx: number = 4

    private readonly playSpeeds = [5, 50, 100, 250, 500, 750]
    private trays: Tray[] = []
    private marbles: Marble[] = []

    get playSpeed() {
      return this.playSpeeds[this.playSpeedIdx]
    }

    get running(): boolean {
      return this.marbles.length > 0 && !this.trayIsFull
    }

    get canvas(): HTMLCanvasElement {
      return this.$refs['galton-board'] as HTMLCanvasElement
    }

    get context(): CanvasRenderingContext2D {
      const ctx = this.canvas.getContext('2d')
      if (ctx === null) throw new Error('unable to initialize context')
      return ctx
    }

    get trayWidth(): number {
      return this.width / this.nrTrays
    }

    get nrMarblesInTray(): number {
      return Math.floor(this.trayWidth / this.marbleWidth)
    }

    get maxMarblesInTray(): number {
      const traySize = this.trayWidth * this.trayHeight
      const marbleSize = this.marbleWidth * this.marbleHeight

      return Math.floor(traySize / marbleSize) + 1 - this.nrMarblesInTray
    }

    get marbleWidth(): number {
      return 2 * this.marbleRadius
    }

    get marbleHeight(): number {
      return 2 * this.marbleRadius
    }

    get nrPegRows(): number {
      return this.nrTrays - 1
    }

    get trayIsFull(): boolean {
      return this.trays.some(tray => tray > this.maxMarblesInTray)
    }

    mounted() {
      this.canvas.width = this.width + 1
      this.canvas.height = this.height + 1

      this.reset()
    }

    private drawBackground() {
      this.drawTrays()
      this.drawPegs()
    }

    private drawTrays() {
      const bottom = this.height + .5

      this.context.beginPath()
      for (let trayIdx = 0; trayIdx <= this.nrTrays; trayIdx += 1) {
        const x = trayIdx * this.trayWidth + .5

        this.context.moveTo(x, bottom - this.trayHeight)
        this.context.lineTo(x, bottom)
        this.context.lineTo(x + this.trayWidth, bottom)
      }
      this.context.stroke()
    }

    private drawPegs() {
      for (let pegRow = 0; pegRow < this.nrPegRows; pegRow += 1) {
        for (let pegNr = 0; pegNr <= pegRow; pegNr += 1) {
          const [x, y] = this.getPegPosition(pegRow, pegNr)
          this.context.beginPath()
          this.context.arc(x, y, this.pegSize, 0, 2 * Math.PI)
          this.context.fillStyle = '#000'
          this.context.fill()
        }
      }
    }

    private redrawPegs() {
      this.context.clearRect(0, 0, this.width + 1, this.height - this.trayHeight + 1)
      this.drawPegs()
    }

    private getPegPosition(row: number, idx: number): [number, number] {
      const padding = (this.width - row * this.trayWidth) / 2
      const x = padding + idx * this.trayWidth
      const y = row * this.pegRowHeight + this.topPadding

      return [x, y]
    }

    private drawMarble(marble: Marble) {
      const [x, y] = this.getPegPosition(marble.row, marble.idx)
      this.context.beginPath()
      this.context.arc(x, y, this.marbleRadius, 0, 2 * Math.PI)
      this.context.fillStyle = marble.color
      this.context.fill()
      this.context.stroke()
    }

    private addToTray(marble: Marble) {
      const marbleNr = this.trays[marble.idx]
      this.trays = this.trays.map((tray, idx) => idx === marble.idx ? (tray + 1) : tray)

      const marbleX = marbleNr % this.nrMarblesInTray
      const marbleY = Math.floor(marbleNr / this.nrMarblesInTray)

      const x = marble.idx * this.trayWidth + (marbleX + .5) * this.marbleWidth
      const y = this.height - (marbleY + .5) * this.marbleHeight

      this.context.beginPath()
      this.context.arc(x, y, this.marbleRadius, 0, 2 * Math.PI)
      this.context.fillStyle = marble.color
      this.context.fill()
      this.context.stroke()
    }

    reset() {
      this.generateNewMarbles = false
      this.marbles = []
      this.trays = []
      for (let i = 0; i < this.nrTrays; i += 1) {
        this.trays.push(0)
      }
      this.context.clearRect(0, 0, this.width + 1, this.height + 1)
      this.drawBackground()
    }

    start() {
      this.generateNewMarbles = true

      if (!this.running) {
        this.iter()
      }
    }

    stop() {
      this.generateNewMarbles = false
    }

    iter() {
      this.redrawPegs()

      const next = this.marbles.map(marble => marble.drop())

      if (this.generateNewMarbles) {
        next.push(new Marble())
      }

      this.marbles = next.filter(marble => marble.row < this.nrPegRows)
      this.marbles.forEach(marble => this.drawMarble(marble))

      next.filter(marble => marble.row === this.nrPegRows)
        .forEach(marble => this.addToTray(marble))

      if (this.running) {
        setTimeout(() => this.iter(), this.playSpeed)
      }
    }
  }
</script>

<style scoped lang="sass">
  canvas
    display: block

  .play-speed
    display: flex
    align-items: center
    margin-top: .5rem
</style>
