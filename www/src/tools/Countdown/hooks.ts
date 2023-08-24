import { useState } from 'preact/hooks'
import { convert, useFormHandler } from '../../util/form'
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

  const { error, onSubmit } = useFormHandler(async (event, { setError }) => {
    const formData = readForm(event.target)
    if (formData === undefined) {
      setError('Please fill in all required fields')
      return
    }
    const [target, numbers] = formData

    setComputing(true)
    setError(undefined)
    try {
      const solution = await solve(target, numbers)
      setSolution(solution ? solution.map(formatLine) : solution)
    } finally {
      setComputing(false)
    }
  }, [])

  return {
    computing,
    solution,
    error,
    onSubmit,
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
