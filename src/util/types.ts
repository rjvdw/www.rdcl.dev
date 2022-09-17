import { Dispatch, SetStateAction } from 'react'

export type HookSetter<T> = Dispatch<SetStateAction<T>>

export interface Serde<T> {
  serialize(value: T): string

  deserialize(serialized: string): T
}
