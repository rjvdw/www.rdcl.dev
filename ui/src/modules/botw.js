import { createSlice } from '@reduxjs/toolkit'
import data from './botw.data.yaml'

const INITIAL_STATE = {
  sets: Object.entries(data.sets)
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
})

export const botw = reducer
