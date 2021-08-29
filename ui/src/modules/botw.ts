import { createSlice } from '@reduxjs/toolkit'
// @ts-ignore
import data from './botw.data.yaml' // FIXME: Proper typings

type RawData = {
  sets: {
    [setName: string]: {
      [partName: string]: 'n/a' | string[],
    },
  },
}

export type BotwState = {
  sets: Array<{
    name: string,
    parts: Array<{
      name: string,
      upgrades: null | string[][][],
    }>,
  }>,
}

const INITIAL_STATE: BotwState = {
  sets: Object.entries((data as RawData).sets)
    .map(([setName, parts]) => ({
      name: setName,
      parts: Object.entries(parts)
        .map(([partName, upgrades]) => ({
          name: partName,
          upgrades: upgrades === 'n/a'
            ? null
            : upgrades.map(upgrade => upgrade
              .split(/\s*,\s*/)
              .map(x => x.split(/\s*x\s*/))
            ),
        })),
    })),
}

const { reducer } = createSlice({
  name: 'botw',
  initialState: INITIAL_STATE,
  reducers: {},
})

export const botw = reducer
