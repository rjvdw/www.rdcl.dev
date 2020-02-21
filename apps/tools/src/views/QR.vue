<template>
  <div class="qr-container">
    <section class="form-field">
      <label for="qr-data">Data:</label><br>
      <input
          type="text"
          id="qr-data"
          autofocus
          v-model="qrData"
          v-on:input="update"
      >
    </section>

    <canvas ref="qr-output"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import qr from 'qrcode'

  @Component
  export default class QR extends Vue {
    private readonly qrOutputWidth: number = 500
    private readonly qrOutputHeight: number = 500

    qrData = QR.getQrDataFromQueryString()

    get qrOutputCanvas(): HTMLCanvasElement {
      return this.$refs['qr-output'] as HTMLCanvasElement
    }

    get qrOutputContext(): CanvasRenderingContext2D {
      const ctx = this.qrOutputCanvas.getContext('2d')
      if (ctx === null) throw new Error('unable to initialize qrOutputContext')
      return ctx
    }

    mounted() {
      this.update(false)
      window.addEventListener('popstate', this.handlePopState)
    }

    destroyed() {
      window.removeEventListener('popstate', this.handlePopState)
    }

    private handlePopState(event: PopStateEvent): void {
      this.qrData = QR.getQrDataFromQueryString()
      this.update(false)
    }

    update(replaceState = true) {
      if (this.qrData) {
        if (replaceState) {
          history.replaceState(history.state, '', `?qr=${ QR.encode(this.qrData) }`)
        }
        qr.toCanvas(this.qrOutputCanvas, this.qrData, (err) => {
          if (err === null) return
          console.error(err)
        })
      } else {
        if (replaceState) {
          history.replaceState(history.state, '', '?')
        }
        this.reset()
      }
    }

    private reset() {
      this.qrOutputCanvas.width = this.qrOutputWidth
      this.qrOutputCanvas.height = this.qrOutputHeight
      this.qrOutputContext.clearRect(0, 0, this.qrOutputWidth, this.qrOutputHeight)
    }

    private static encode(str: string): string {
      return encodeURIComponent(str)
    }

    private static decode(str: string): string {
      return decodeURIComponent(str)
    }

    private static getQrDataFromQueryString(): string {
      try {
        if (location.search) {
          const parts = location.search.substring(1).split(/[&;]/g)

          for (const part of parts) {
            if (part.startsWith('qr=')) {
              console.log('trying to decode', part.substring(3))
              return QR.decode(part.substring(3))
            }
          }
        }
      } catch (error) {
        console.error(error)
      }

      return ''
    }
  }
</script>

<style scoped lang="sass">
  .qr-container
    display: flex
    align-items: center
    flex-direction: column
    width: 100%

  .form-field
    width: 100%

  canvas
    border: thin dashed gray
    margin-top: 1rem

  #qr-data
    font-size: 1rem
    padding: .25rem .5rem
</style>
