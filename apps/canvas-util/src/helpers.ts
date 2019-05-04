import { ConversionError } from './errors'

export function getAs<T>(el: any, constr: { new(): T }): T {
  if (el instanceof constr) {
    return el
  } else {
    throw new ConversionError(constr)
  }
}
