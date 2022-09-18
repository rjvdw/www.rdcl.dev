import { Dispatch, SetStateAction } from 'react'

export type HookSetter<T> = Dispatch<SetStateAction<T>>
