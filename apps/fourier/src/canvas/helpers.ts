import { animationFrameScheduler } from 'rxjs'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_X_BOUND,
  CANVAS_Y_BOUND,
  CURSOR_SIZE,
  SCALING_FACTOR,
  ZERO
} from './constants'
import { CursorType, DrawData, GraphType } from '@/types'

export function getCanvas(id: string): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.getElementById(id) as HTMLCanvasElement

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error(`Unable to initialize canvas #${ id }`)

  return [canvas, ctx]
}

export function draw(ctx: CanvasRenderingContext2D) {
  return (data: DrawData) => {
    resetGraph(ctx)
    drawCursor(ctx, data.cursor)
    drawGraph(ctx, data.graph, now())
  }
}

function resetGraph(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_X_BOUND, CANVAS_Y_BOUND)

  ctx.beginPath()
  ctx.setLineDash([])
  ctx.strokeStyle = '#000'

  ctx.moveTo(0, ZERO)
  ctx.lineTo(CANVAS_X_BOUND, ZERO)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineDash([5])
  ctx.strokeStyle = '#999'

  ctx.moveTo(0, ZERO + SCALING_FACTOR)
  ctx.lineTo(CANVAS_X_BOUND, ZERO + SCALING_FACTOR)
  ctx.stroke()

  ctx.moveTo(0, ZERO - SCALING_FACTOR)
  ctx.lineTo(CANVAS_X_BOUND, ZERO - SCALING_FACTOR)
  ctx.stroke()
}

function drawCursor(ctx: CanvasRenderingContext2D, [x, y]: CursorType) {
  ctx.beginPath()
  ctx.arc(x, y, CURSOR_SIZE / 2, 0, 2 * Math.PI)
  ctx.fill()
}

function drawGraph(ctx: CanvasRenderingContext2D, graph: GraphType, now: number) {
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.strokeStyle = '#66f'

  graph.forEach(([timestamp, y]) => {
    const x = CANVAS_X_BOUND - SCALING_FACTOR * (now - timestamp)
    ctx.lineTo(x, y)
  })
  ctx.stroke()
}

export function now() {
  return animationFrameScheduler.now() / 1000
}
