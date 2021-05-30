import React, { useState } from 'react'
import Decimal from 'decimal.js'

// FIXME: The precision of Decimal seems to jump around.
//        The fix should be to create a new decimal constructor, but calling `Decimal.constructor` gives an error.
//        See https://www.npmjs.com/package/decimal.js/v/3.0.0 for more info.

const CONVERSIONS = [
  {
    type: 'Length/Distance',
    id: 'length',
    units: [
      { name: 'Millimeters', symbol: 'mm', factor: new Decimal('0.001') },
      { name: 'Centimeters', symbol: 'cm', factor: new Decimal('0.01') },
      { name: 'Meters', symbol: 'm', factor: new Decimal('1') },
      { name: 'Kilometers', symbol: 'km', factor: new Decimal('1000') },
      { name: 'Inches', symbol: 'in', factor: new Decimal('0.0254') },
      { name: 'Feet', symbol: 'ft', factor: new Decimal('0.3048') },
      { name: 'Yards', symbol: 'yd', factor: new Decimal('0.9144') },
      { name: 'Miles', symbol: 'mi', factor: new Decimal('1609.344') },
    ],
  },
  {
    type: 'Weight',
    id: 'weight',
    units: [
      { name: 'Milligrams', symbol: 'mg', factor: new Decimal('0.000001') },
      { name: 'Grams', symbol: 'g', factor: new Decimal('0.001') },
      { name: 'Kilograms', symbol: 'kg', factor: new Decimal('1') },
      { name: 'Pound', symbol: 'lb', factor: new Decimal('0.45359237') },
      { name: 'Stone', symbol: 'st', factor: new Decimal('6.35029318') },
    ],
  },
  {
    type: 'Volume',
    id: 'volume',
    units: [
      { name: 'Milliliters', symbol: 'ml', factor: new Decimal('0.001') },
      { name: 'Liters', symbol: 'l', factor: new Decimal('1') },
      { name: 'Cubic meters', symbol: 'm³', factor: new Decimal('1000') },
    ],
  },
  {
    type: 'Angles/Slopes',
    id: 'angle',
    units: [
      { name: 'Degrees', symbol: '°', factor: new Decimal('1') },
      { name: 'Radians', symbol: 'rad', factor: new Decimal('57.2957795131') },
      // TODO: Add slope (need to use tan, rather than a constant factor)
    ],
  },
]

const ONE = new Decimal(1)
const INITIAL_STATE = Object.fromEntries(
  CONVERSIONS.map(conversion => [
    conversion.id,
    Object.fromEntries(
      conversion.units.map(unit => [
        unit.symbol,
        ONE.div(unit.factor),
      ])
    ),
  ])
)

export const Conversions = () => {
  const [values, setValues] = useState(INITIAL_STATE)

  const setValue = (conversion, unit, value) => {
    if (value === '') {
      setValues({
        ...values,
        [conversion.id]: {
          ...values[conversion.id],
          [unit.symbol]: '',
        },
      })
    } else {
      const decimalValue = new Decimal(+value).mul(unit.factor)
      setValues({
        ...values,
        [conversion.id]: Object.fromEntries(
          conversion.units.map(unit => [
            unit.symbol,
            decimalValue.div(unit.factor),
          ])
        ),
      })
    }
  }

  return <>
    <h1>Common Unit Conversions</h1>

    { CONVERSIONS.map(conversion => <React.Fragment key={ conversion.id }>
      <h2>{ conversion.type }</h2>
      <rdcl-input-grid suffix>
        { conversion.units.map(unit => <React.Fragment key={ `${ conversion.id }_${ unit.symbol }` }>
          <label data-start={ 1 } htmlFor={ `${ conversion.id }_${ unit.symbol }` }>{ unit.name }</label>
          <input
            id={ `${ conversion.id }_${ unit.symbol }` }
            value={ values[conversion.id][unit.symbol] }
            onChange={ event => setValue(conversion, unit, event.target.value) }
            type="number"
            inputMode="decimal"
            step="any"
          />
          <label htmlFor={ `${ conversion.id }_${ unit.symbol }` }>{ unit.symbol }</label>
        </React.Fragment>) }
      </rdcl-input-grid>
    </React.Fragment>) }
  </>
}

export default Conversions
