import React, { useId } from 'react'
import { Title } from '../../components/Title'
import { useBmi } from './Bmi.hooks'

export const Bmi = () => {
  const id = useId()
  const {
    form: { register },
    targetBmiIsShown,
    showTargetBmi,
    targetBmi,
  } = useBmi()

  return (
    <>
      <Title prefix="tools">bmi</Title>
      <h1>BMI Calculator</h1>

      <rdcl-input-grid suffix>
        <label htmlFor={`${id}:weight`}>Weight</label>
        <input
          id={`${id}:weight`}
          data-testid="weight"
          type="number"
          inputMode="decimal"
          step="any"
          {...register('weight', {
            valueAsNumber: true,
          })}
        />
        <label htmlFor={`${id}:weight`}>kg</label>

        <label htmlFor={`${id}:height`}>Height</label>
        <input
          id={`${id}:height`}
          data-testid="height"
          type="number"
          inputMode="decimal"
          step="any"
          {...register('height', {
            valueAsNumber: true,
          })}
        />
        <label htmlFor={`${id}:height`}>cm</label>

        <label htmlFor={`${id}:bmi`}>BMI</label>
        <input
          id={`${id}:bmi`}
          data-testid="bmi"
          readOnly
          type="number"
          inputMode="decimal"
          step="any"
          onClick={showTargetBmi}
          {...register('bmi', {
            valueAsNumber: true,
          })}
        />
      </rdcl-input-grid>

      {targetBmiIsShown && (
        <form onSubmit={targetBmi.onSubmit}>
          <h2>Target BMI</h2>
          <rdcl-input-grid suffix>
            <label htmlFor={`${id}:target-bmi`}>BMI</label>
            <input
              id={`${id}:target-bmi`}
              data-testid="target-bmi"
              type="number"
              inputMode="decimal"
              step="any"
              {...targetBmi.register}
            />
            <button data-start={2} data-testid="submit-target-bmi">
              Submit
            </button>
          </rdcl-input-grid>
        </form>
      )}
    </>
  )
}

export default Bmi
