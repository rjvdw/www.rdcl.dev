import { Canvas } from '@rdcl-dev/canvas-util'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/canvas/constants'

export default new Canvas({
  element: '#input-graph',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
})

