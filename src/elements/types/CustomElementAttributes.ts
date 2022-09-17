import { HTMLAttributes, RefObject } from 'react'

export interface CustomElementAttributes<E extends HTMLElement = HTMLElement> extends HTMLAttributes<E> {
  ref?: RefObject<E>
}
