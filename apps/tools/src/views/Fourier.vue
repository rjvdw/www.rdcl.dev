<template>
  <div id="fourier">
    <p>FPS: {{ fps }}</p>
    <canvas ref="input-graph"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type FormulaType = (input: number) => number
  type PlotHistoryType = [number, number][]

  @Component
  export default class Fourier extends Vue {
    private startingTimestamp: number = -1
    private isMounted: boolean = false
    private readonly inputGraphWidth: number = 800
    private readonly inputGraphHeight: number = 100
    private history: PlotHistoryType = []

    get inputGraphCanvas(): HTMLCanvasElement {
      return this.$refs['input-graph'] as HTMLCanvasElement
    }

    get inputGraphContext(): CanvasRenderingContext2D {
      const ctx = this.inputGraphCanvas.getContext('2d')
      if (ctx === null) throw new Error('unable to initialize inputGraphContext')
      return ctx
    }

    get alive(): boolean {
      return this.isMounted
    }

    get centerOfGraph(): number {
      return this.inputGraphHeight / 2 + .5
    }

    get scalingFactor(): number {
      return 3 / 8 * this.inputGraphHeight
    }

    get formula(): FormulaType {
      return (time) => .5 * Math.sin(time - 1) + .5 * Math.sin(3 * time - 2)
    }

    get fps(): string {
      if (this.history.length < 15) return '???'

      const [tStart] = this.history[0]
      const [tEnd] = this.history[this.history.length - 1]
      const fps = this.history.length / (tEnd - tStart)

      return fps.toFixed(1)
    }

    mounted() {
      this.inputGraphCanvas.width = this.inputGraphWidth + 1
      this.inputGraphCanvas.height = this.inputGraphHeight + 1
      this.isMounted = true
      this.tick()
    }

    tick() {
      requestAnimationFrame(timestamp => this.alive && this.draw(timestamp))
    }

    clear() {
      this.inputGraphContext.clearRect(0, 0, this.inputGraphWidth + 1, this.inputGraphHeight + 1)
    }

    draw(timestamp: number) {
      if (this.startingTimestamp === -1) {
        this.startingTimestamp = timestamp
      }

      const cursorSize = 10

      const offset = this.centerOfGraph
      const time = (timestamp - this.startingTimestamp) / 1000

      const x = this.inputGraphWidth + .5
      const y = offset + this.scalingFactor * this.formula(time)

      this.clear()
      this.drawBackground()
      this.drawGraph(time)

      this.inputGraphContext.beginPath()
      this.inputGraphContext.arc(x, y, cursorSize / 2, 0, 2 * Math.PI)
      this.inputGraphContext.fill()

      this.history = this.truncateVisibleHistory(time, this.history.concat([[time, y]]))

      this.tick()
    }

    truncateVisibleHistory(time: number, history: PlotHistoryType): PlotHistoryType {
      const idx = history.findIndex(([t]) => this.scalingFactor * (time - t) < this.inputGraphWidth + 1)

      return (idx === -1 || idx === 0)
        ? history
        : history.slice(idx - 1)
    }

    drawGraph(currentTime: number) {
      this.inputGraphContext.beginPath()
      this.inputGraphContext.setLineDash([])
      this.inputGraphContext.strokeStyle = '#66f'

      this.history.forEach(([t, y]) => {
        const x = this.inputGraphWidth + 1 - this.scalingFactor * (currentTime - t)
        this.inputGraphContext.lineTo(x, y)
      })
      this.inputGraphContext.stroke()
    }

    drawBackground() {
      this.inputGraphContext.beginPath()
      this.inputGraphContext.setLineDash([])
      this.inputGraphContext.strokeStyle = '#000'

      this.inputGraphContext.moveTo(0, this.centerOfGraph)
      this.inputGraphContext.lineTo(this.inputGraphWidth + 1, this.centerOfGraph)
      this.inputGraphContext.stroke()

      this.inputGraphContext.beginPath()
      this.inputGraphContext.setLineDash([5])
      this.inputGraphContext.strokeStyle = '#999'

      this.inputGraphContext.moveTo(0, this.centerOfGraph + this.scalingFactor)
      this.inputGraphContext.lineTo(this.inputGraphWidth + 1, this.centerOfGraph + this.scalingFactor)
      this.inputGraphContext.stroke()

      this.inputGraphContext.moveTo(0, this.centerOfGraph - this.scalingFactor)
      this.inputGraphContext.lineTo(this.inputGraphWidth + 1, this.centerOfGraph - this.scalingFactor)
      this.inputGraphContext.stroke()
    }

    beforeDestroy() {
      this.isMounted = false
    }
  }
</script>

<style lang="sass" scoped>
  canvas
    border: thin dashed gray
</style>
