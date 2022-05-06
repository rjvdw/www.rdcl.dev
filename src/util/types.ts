import React from 'react'

export type HookSetter<T> = React.Dispatch<React.SetStateAction<T>>

export interface Serde<T> {
  serialize(value: T): string

  deserialize(serialized: string): T
}
