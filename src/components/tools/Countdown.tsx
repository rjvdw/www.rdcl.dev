import React, { useState } from 'react'

type Answer = [string, number, number, number]
type Operation = (n1: number, n2: number) => number | null

const OPERATIONS: { [op: string]: Operation } = {
  add(n1, n2) {
    return n1 + n2
  },
  multiply(n1, n2) {
    return n1 * n2
  },
  subtract(n1, n2) {
    return (n1 > n2) ? (n1 - n2) : (n2 - n1)
  },
  divide(n1, n2) {
    if (n1 > 0 && n2 % n1 === 0) return n2 / n1
    if (n2 > 0 && n1 % n2 === 0) return n1 / n2
    return null
  },
}

export const Countdown = () => {
  const [computing, setComputing] = useState(false)
  const [inp1, setInp1] = useState<number | string>('')
  const [inp2, setInp2] = useState<number | string>('')
  const [inp3, setInp3] = useState<number | string>('')
  const [inp4, setInp4] = useState<number | string>('')
  const [inp5, setInp5] = useState<number | string>('')
  const [inp6, setInp6] = useState<number | string>('')
  const [target, setTarget] = useState<number | string>('')
  const [solution, setSolution] = useState<Answer[] | null | undefined>(undefined)

  return <>
    <h1>Countdown</h1>

    <form onSubmit={ event => {
      event.preventDefault()
      setComputing(true)

      solve(+target, [+inp1, +inp2, +inp3, +inp4, +inp5, +inp6])
        .then(solution => {
          setComputing(false)
          setSolution(solution)
        })
    } }>
      <rdcl-input-grid>
        <label htmlFor="cd-inp-1">Numbers:</label>

        <rdcl-combi-input>
          <CDInput id="cd-inp-1" autoFocus value={ inp1 } set={ setInp1 }/>
          <CDInput id="cd-inp-2" value={ inp2 } set={ setInp2 }/>
        </rdcl-combi-input>

        <rdcl-combi-input data-start={ 2 }>
          <CDInput id="cd-inp-3" value={ inp3 } set={ setInp3 }/>
          <CDInput id="cd-inp-4" value={ inp4 } set={ setInp4 }/>
        </rdcl-combi-input>

        <rdcl-combi-input data-start={ 2 }>
          <CDInput id="cd-inp-5" value={ inp5 } set={ setInp5 }/>
          <CDInput id="cd-inp-6" value={ inp6 } set={ setInp6 }/>
        </rdcl-combi-input>

        <label htmlFor="cd-inp-target">Target:</label>
        <CDInput id="cd-inp-target" min={ 100 } max={ 999 } value={ target } set={ setTarget }/>

        <button data-start={ 2 } disabled={ computing }>Let&apos;s Play Countdown!</button>
      </rdcl-input-grid>
    </form>

    { computing && <>
      <h2>Computing...</h2>
    </> }

    { !computing && solution &&
      <section id="cd-solution">
        <h2>Solution</h2>
        <ul>
          { solution.map((line, key) => (
            <li key={ key }>{ line[0] }({ line[1] }, { line[2] }) &rarr; { line[3] }</li>
          )) }
        </ul>
      </section>
    }

    { !computing && solution === null && <>
      <section id="cd-solution">
        <h2>Solution</h2>
        <p>This one is not possible</p>
      </section>
    </> }
  </>
}

export default Countdown

const CDInput = ({ set, ...props }: { set: (value: number | string) => void, [key: string]: unknown }) =>
  <input
    type="number"
    inputMode="numeric"
    min={ 1 }
    max={ 100 }
    required
    onChange={ event => set && set(nrValue(event.target.value)) }
    { ...props }
  />

function nrValue(value: string): number | string {
  if (value === '') return ''
  return +value
}

function solve(target: number, numbers: number[]): Promise<Answer[] | null> {
  return new Promise(resolve => {
    setTimeout(() => { // timeout to allow UI to update
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
      const n1 = numbers[i]
      const n2 = numbers[j]
      const reduced = numbers
        .slice(0, i)
        .concat(numbers.slice(i + 1, j))
        .concat(numbers.slice(j + 1))
      reduced.length += 1

      for (const key in OPERATIONS) {
        const operation = OPERATIONS[key]
        const result = operation(n1, n2)

        if (result === null) {
          continue
        }

        const answer: Answer = [key, n1, n2, result]

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
