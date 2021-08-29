import React, { ChangeEvent, useState } from 'react'
import { Serde } from '../../util/types'
import { useLocalStorage } from '../../util/hooks'

const serde: Serde<number | ''> = {
  serialize(value) {
    return value.toString()
  },

  deserialize(serialized) {
    return serialized === '' ? '' : +serialized
  },
}

export const Bmi = () => {
  const [weight, setWeight] = useLocalStorage('bmi:weight', 75, serde)
  const [height, setHeight] = useLocalStorage('bmi:height', 185, serde)
  const [bmiIsEmpty, setBmiIsEmpty] = useState(false)

  const cHeight = height === '' ? Number.NaN : (height / 100) ** 2
  const bmi = +weight / cHeight

  const setBmi = (value: number | '') => {
    setBmiIsEmpty(value === '')
    setWeight(+value * cHeight)
  }

  return <>
    <h1>BMI Calculator</h1>

    <rdcl-input-grid suffix>
      <label htmlFor="weight">Weight</label>
      <input
        id="weight"
        type="number"
        inputMode="decimal"
        step="any"
        value={ formatted(weight) }
        onChange={ getHandler(setWeight) }
      />
      <label htmlFor="weight">kg</label>

      <label htmlFor="height">Height</label>
      <input
        id="height"
        type="number"
        inputMode="decimal"
        step="any"
        value={ height }
        onChange={ getHandler(setHeight) }
      />
      <label htmlFor="height">cm</label>

      <label htmlFor="bmi">BMI</label>
      <input
        id="bmi"
        type="number"
        inputMode="decimal"
        step="any"
        value={ bmiIsEmpty ? '' : formatted(bmi) }
        onChange={ getHandler(setBmi) }
      />
    </rdcl-input-grid>
  </>
}

export default Bmi

function getHandler(setter: (value: number | '') => void): (event: ChangeEvent<HTMLInputElement>) => void {
  return event => {
    const { value } = event.target
    setter(value === '' ? '' : +value)
  }
}

function formatted(value: number | ''): number | '' {
  return (value === '' || Number.isNaN(value)) ? '' : Number(value.toFixed(2))
}
