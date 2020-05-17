import { createSlice } from '@reduxjs/toolkit'
import data from './botw.data.yaml'

const NOT_APPLICABLE = [null, null, null, null]

const INITIAL_STATE = {
  sets: Object.entries(data.sets)
    .map(([setName, parts]) => ({
      name: setName,
      parts: Object.entries(parts)
        .map(([partName, upgrades]) => ({
          name: partName,
          upgrades: upgrades === 'n/a' ? NOT_APPLICABLE : upgrades.map(parseUpgrade),
        })),
    })),
}

const { reducer } = createSlice({
  name: 'botw',
  initialState: INITIAL_STATE,
})

function parseUpgrade(upgrade) {
  return upgrade.split(/\s*,\s*/)
    .map(x => x.split(/\s*x\s*/))
}

export const botw = reducer
