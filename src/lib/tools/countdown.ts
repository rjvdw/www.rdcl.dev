type Operation = (n1: number, n2: number) => number | null
type AllOperations = {
  add: Operation
  multiply: Operation
  subtract: Operation
  divide: Operation
}
const OPERATIONS: AllOperations = {
  add(n1, n2) {
    return n1 + n2
  },
  multiply(n1, n2) {
    return n1 * n2
  },
  subtract(n1, n2) {
    return n1 > n2 ? n1 - n2 : n2 - n1
  },
  divide(n1, n2) {
    if (n1 > 0 && n2 % n1 === 0) return n2 / n1
    if (n2 > 0 && n1 % n2 === 0) return n1 / n2
    return null
  },
}
type OperationType = keyof typeof OPERATIONS
export type Answer = [OperationType, number, number, number]

const ALL_OPERATIONS: OperationType[] = [
  'add',
  'multiply',
  'subtract',
  'divide',
]

export function solve(
  target: number,
  numbers: number[],
): Promise<Answer[] | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // timeout to allow UI to update
      resolve(_solve(target, numbers))
    }, 1)
  })
}

function _solve(target: number, numbers: number[]): Answer[] | null {
  // TODO: somehow make this method run in a worker or something

  const size = numbers.length
  if (size === 1) {
    return null
  }

  for (let i = 0; i < size - 1; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      const n1 = numbers[i]!
      const n2 = numbers[j]!
      const reduced = numbers
        .slice(0, i)
        .concat(numbers.slice(i + 1, j))
        .concat(numbers.slice(j + 1))
      reduced.length += 1

      for (const key of ALL_OPERATIONS) {
        const operation = OPERATIONS[key]
        const result = operation(n1, n2)

        if (result === null) {
          continue
        }

        const answer: Answer =
          (key === 'subtract' || key === 'divide') && n2 > n1
            ? [key, n2, n1, result]
            : [key, n1, n2, result]

        if (result === target) {
          return [answer]
        }

        reduced[size - 2] = result
        const answers = _solve(target, reduced)

        if (answers !== null) {
          answers.unshift(answer)
          return answers
        }
      }
    }
  }

  return null
}
