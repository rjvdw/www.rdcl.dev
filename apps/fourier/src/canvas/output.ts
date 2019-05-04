import { Canvas } from '@rdcl-dev/canvas-util'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/canvas/constants'

export default new Canvas({
  element: '#output-graph',
  contextType: '2d',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
})

