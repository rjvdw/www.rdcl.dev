import { useState } from 'preact/hooks'
import { errorAsString } from '../../util/errors'
import { convert, isFormSubmitEvent } from '../../util/form'
import { Answer, solve } from './solver'

type UseCountdownReturn = {
  computing: boolean
  solution: string[] | null | undefined
  error?: string
  onSubmit: (this: void, event: Event) => void
}

export function useCountdown(): UseCountdownReturn {
  const [computing, setComputing] = useState(false)
  const [solution, setSolution] = useState<string[] | null>()
  const [error, setError] = useState<string>()

  return {
    computing,
    solution,
    error,
    onSubmit(event) {
      event.preventDefault()

      if (!isFormSubmitEvent(event)) {
        setError('Unexpected error handling the form submit')
        return
      }

      const formData = readForm(event.target)
      if (formData === undefined) {
        setError('Please fill in all required fields')
        return
      }
      const [target, numbers] = formData

      setComputing(true)
      solve(target, numbers)
        .then(
          (solution) => {
            setError(undefined)
            setSolution(solution ? solution.map(formatLine) : solution)
          },
          (error) => {
            setError(errorAsString(error))
          },
        )
        .finally(() => {
          setComputing(false)
        })
    },
  }
}

function readForm(form: HTMLFormElement): [number, number[]] | undefined {
  const result: [number, number[]] = [-1, []]

  for (const field of form.querySelectorAll<HTMLInputElement>(
    'input[type="number"]',
  )) {
    const value = convert.number(field.value)

    if (value === undefined) {
      return undefined
    }

    if (field.name === 'target') {
      result[0] = value
    } else if (field.name.startsWith('numbers.')) {
      result[1].push(value)
    }
  }

  return result
}

function formatLine([operation, op1, op2, result]: Answer): string {
  switch (operation) {
    case 'add':
      return `${op1} + ${op2} = ${result}`
    case 'multiply':
      return `${op1} * ${op2} = ${result}`
    case 'subtract':
      return `${op1} - ${op2} = ${result}`
    case 'divide':
      return `${op1} / ${op2} = ${result}`
  }
}
