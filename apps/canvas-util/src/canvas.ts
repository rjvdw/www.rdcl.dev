import { ContextNotFound, ElementNotFound } from './errors'
import { getAs } from './helpers'
import { ContextAttributesType, ContextIdType, ContextType } from './types'

export interface CanvasConfig {
  /**
   * Either a DOM query resulting in the relevant canvas element, or the canvas element itself.
   */
  element: string | Element;

  /**
   * The width the canvas should be.
   */
  width: number;

  /**
   * The height the canvas should be.
   */
  height: number;

  /**
   * Defines the drawing context associated to the canvas. Defaults to '2d'.
   */
  contextType?: ContextIdType;

  /**
   * The context attributes used in defining the drawing context.
   */
  contextAttributes?: ContextAttributesType;
}

export default class Canvas {
  readonly canvas: HTMLCanvasElement
  readonly context: ContextType

  constructor({ element, width, height, contextType = '2d', contextAttributes }: CanvasConfig) {
    this.canvas = getCanvasElement(element)
    this.canvas.width = width
    this.canvas.height = height

    this.context = getCanvasContext(this.canvas, contextType, contextAttributes)
  }
}

// helper functions

function getCanvasElement(from: string | Element): HTMLCanvasElement {
  let element: Element
  if (typeof from === 'string') {
    const el = document.querySelector(from)

    if (el === null) {
      throw new ElementNotFound(from)
    }

    element = el
  } else {
    element = from
  }

  return getAs(element, HTMLCanvasElement)
}

function getCanvasContext(
  canvas: HTMLCanvasElement,
  contextType: ContextIdType,
  contextAttributes?: ContextAttributesType,
): ContextType {
  const ctx = canvas.getContext(contextType, contextAttributes)
  if (ctx === null) {
    throw new ContextNotFound(contextType)
  }
  return getAs(ctx, CanvasRenderingContext2D) // FIXME: Hardcoded to 2d rendering context
}
