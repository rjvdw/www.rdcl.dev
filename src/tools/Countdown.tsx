import React, { useId } from 'react'
import { FieldPath } from 'react-hook-form'
import { Title } from '../components/Title'
import { CountdownForm, useCountdown } from './Countdown.hooks'

type CDInputType = (
  key: FieldPath<CountdownForm>,
  options?: {
    min?: number
    max?: number
    autoFocus?: boolean
  },
) => JSX.Element

export const Countdown = () => {
  const id = useId()
  const { form: { register }, onSubmit, computing, solution } = useCountdown()

  const input: CDInputType = (key, { min = 1, max = 100, autoFocus = false } = {}) => (
    <input
      autoFocus={ autoFocus }
      id={ `${ id }:${ key }` }
      data-testid={ `cd-inp-${ key }` }
      type="number"
      inputMode="numeric"
      min={ min }
      max={ max }
      required
      { ...register(key, {
        valueAsNumber: true,
      }) }
    />
  )

  return <>
    <Title prefix="tools">countdown</Title>
    <h1>Countdown</h1>

    <form onSubmit={ onSubmit }>
      <rdcl-input-grid>
        <label htmlFor={ `${ id }:numbers.0` }>Numbers:</label>

        <rdcl-combi-input>
          { input('numbers.0', { autoFocus: true }) }
          { input('numbers.1') }
        </rdcl-combi-input>

        <rdcl-combi-input data-start={ 2 }>
          { input('numbers.2') }
          { input('numbers.3') }
        </rdcl-combi-input>

        <rdcl-combi-input data-start={ 2 }>
          { input('numbers.4') }
          { input('numbers.5') }
        </rdcl-combi-input>

        <label htmlFor={ `${ id }:cd-inp-target` }>Target:</label>
        { input('target', { min: 100, max: 999 }) }

        <button data-start={ 2 } disabled={ computing }>Let&apos;s Play Countdown!</button>
      </rdcl-input-grid>
    </form>

    { computing && <h2>Computing...</h2> }

    { !computing && solution &&
      <section data-testid="cd-solution">
        <h2>Solution</h2>
        <ul>
          { solution.map((line, key) => (
            <li key={ key }>{ line }</li>
          )) }
        </ul>
      </section>
    }

    { !computing && solution === null && <>
      <section data-testid="cd-solution">
        <h2>Solution</h2>
        <p>This one is not possible</p>
      </section>
    </> }
  </>
}

export default Countdown
