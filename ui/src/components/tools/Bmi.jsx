import React, { useEffect, useState } from 'react'

export const Bmi = () => {
  const [weight, setWeight] = useLocalStorage('bmi:weight', 75)
  const [height, setHeight] = useLocalStorage('bmi:height', 185)
  const [bmiIsEmpty, setBmiIsEmpty] = useState(false)

  const cHeight = height === '' ? Number.NaN : (height / 100) ** 2
  const bmi = weight / cHeight

  const setBmi = value => {
    setBmiIsEmpty(value === '')
    setWeight(value * cHeight)
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
        onChange={ event => setWeight(event.target.value) }
      />
      <label htmlFor="weight">kg</label>

      <label htmlFor="height">Height</label>
      <input
        id="height"
        type="number"
        inputMode="decimal"
        step="any"
        value={ height }
        onChange={ event => setHeight(event.target.value) }
      />
      <label htmlFor="height">cm</label>

      <label htmlFor="bmi">BMI</label>
      <input
        id="bmi"
        type="number"
        inputMode="decimal"
        step="any"
        value={ bmiIsEmpty ? '' : formatted(bmi) }
        onChange={ event => setBmi(event.target.value) }
      />
    </rdcl-input-grid>
  </>
}

function useLocalStorage(key, initial) {
  const getFromLocalStorage = () => localStorage[key] ? +localStorage[key] : initial
  const [value, setValue] = useState(getFromLocalStorage())

  useEffect(() => {
    const handler = (event) =>
      event.key === key && setValue(getFromLocalStorage())

    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('storage', handler)
    }
  })

  return [
    value,
    newValue => {
      localStorage[key] = newValue
      setValue(newValue === '' ? newValue : +newValue)
    },
  ]
}

function formatted(value) {
  return (value === '' || Number.isNaN(value)) ? '' : Number(value.toFixed(2))
}
