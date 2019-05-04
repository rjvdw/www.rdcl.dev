import { ContextIdType } from './types'

export class ElementNotFound extends Error {
  constructor(selector: string) {
    super(`Unable to find element with selector '${ selector }'`)
  }
}

export class ConversionError<T> extends Error {
  constructor(constr: { new(): T }) {
    super(`Could not convert to '${ constr.name }'`)
  }
}

export class ContextNotFound extends Error {
  constructor(type: ContextIdType) {
    super(`Unable to get a drawing context for type '${ type }'`)
  }
}
