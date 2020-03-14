import React, { useEffect, useState } from 'react'

export const Bmi = () => {
  const [weight, setWeight] = useLocalStorage('bmi:weight', 75)
  const [height, setHeight] = useLocalStorage('bmi:height', 185)

  const cHeight = (height / 100) ** 2
  const bmi = weight / cHeight

  const setBmi = value => {
    setWeight(value * cHeight)
  }

  return <>
    <h1>BMI Calculator</h1>

    <rdcl-input-grid>
      <label htmlFor="weight">Weight (in kgs)</label>
      <input
        id="weight"
        type="number"
        inputMode="decimal"
        step="any"
        value={ formatted(weight) }
        onChange={ event => setWeight(event.target.value) }
      />

      <label htmlFor="height">Height (in cms)</label>
      <input
        id="height"
        type="number"
        inputMode="decimal"
        step="any"
        value={ height }
        onChange={ event => setHeight(event.target.value) }
      />

      <label htmlFor="bmi">BMI</label>
      <input
        id="bmi"
        type="number"
        inputMode="decimal"
        step="any"
        value={ formatted(bmi) }
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
      setValue(+newValue)
    },
  ]
}

function formatted(value) {
  return value === 0 ? '' : Number(value.toFixed(2))
}