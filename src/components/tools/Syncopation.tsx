import classNames from 'classnames'
import React, { useEffect, useReducer, useState } from 'react'
import './Syncopation.styles.sass'

const TIME_SIGNATURES = [2, 3, 4, 5] as const
type TimeSignature = typeof TIME_SIGNATURES[number]
const TS_LCM = lcmReduce([...TIME_SIGNATURES])

type State = {
  times: Record<TimeSignature, boolean>,
  beat: number,
  bpm: number,
}
const INITIAL_STATE = {
  times: Object.fromEntries(TIME_SIGNATURES.map(time => [time, false])),
  beat: 0,
  bpm: 120,
} as State

type Action = {
  type: 'toggle_time',
  payload: TimeSignature,
} | {
  type: 'set_time',
  payload: {
    time: TimeSignature,
    checked: boolean,
  },
} | {
  type: 'beat',
} | {
  type: 'set_bpm',
  payload: number,
}

export const Syncopation: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [bpmValue, setBpmValue] = useState<string>(state.bpm.toString())

  useEffect(() => {
    if (state.bpm === 0) {
      return
    }

    // FIXME: This method of ticking does not seem to be completely accurate...

    const timeout = 60000 / state.bpm
    let id: number | undefined = undefined
    let prev = now()

    function tick() {
      const ts = now()
      const corrected = timeout - (ts - prev - timeout)
      console.log(corrected)
      dispatch({ type: 'beat' })
      id = window.setTimeout(tick, corrected)
      prev = ts
    }

    id = window.setTimeout(tick, timeout)

    return () => window.clearTimeout(id)
  }, [dispatch, state.bpm])

  return <>
    <h1>Syncopation</h1>

    <table className="syncopation simple-table">
      <tbody>
        { TIME_SIGNATURES.map((time) => (
          <tr
            key={ time }
            onClick={ () => dispatch({ type: 'toggle_time', payload: time }) }
            className={ classNames({
              'syncopation--unchecked': !state.times[time],
              'syncopation--checked': state.times[time],
            }) }
          >
            <td className="syncopation__radio">
              <input
                type="radio"
                checked={ state.times[time] }
                readOnly
              />
            </td>
            <th
              className={ classNames(
                'syncopation__time',
                {
                  'syncopation__time--active': state.times[time] && state.beat % time === 0,
                },
              ) }
            >
              { time }
              <span/>
            </th>
            { times(TS_LCM).map((_, key) => (
              <td key={ key } className={ classNames(
                'syncopation__beat',
                {
                  'syncopation__beat--accent': (key % time) === 0,
                  'syncopation__beat--current': (key % time) === 0 && key === state.beat,
                },
              ) }/>
            )) }
          </tr>
        )) }
        <tr className="syncopation__beats syncopation--checked">
          <td/>
          <td>&nbsp;</td>
          { times(TS_LCM).map((_, key) => (
            <td key={ key } className={ classNames(
              'syncopation__beat',
              {
                'syncopation__beat--current': key === state.beat,
              },
            ) }/>
          )) }
        </tr>
      </tbody>
    </table>

    <label className="syncopation__bpm">
      BPM:{ ' ' }
      <input
        type="number"
        value={ bpmValue }
        onChange={ e => {
          dispatch({
            type: 'set_bpm',
            payload: +e.target.value,
          })
          setBpmValue(e.target.value)
        } }
      />
    </label>
  </>
}

export default Syncopation

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle_time':
      return {
        ...state,
        times: {
          ...state.times,
          [action.payload]: !state.times[action.payload],
        },
      }
    case 'set_time':
      return {
        ...state,
        times: {
          ...state.times,
          [action.payload.time]: action.payload.checked,
        },
      }
    case 'beat':
      return {
        ...state,
        beat: (state.beat + 1) % TS_LCM,
      }
    case 'set_bpm':
      return {
        ...state,
        bpm: action.payload,
      }
    default:
      return state
  }
}

function gcd(a: number, b: number): number {
  let ab = [a, b]
  while (ab[1] !== 0) {
    ab = [ab[1], ab[0] % ab[1]]
  }
  return ab[0]
}

function lcm(a: number, b: number): number {
  return a * b / gcd(a, b)
}

function lcmReduce(nrs: number[]): number {
  return nrs.reduce(lcm)
}

function times(count: number, v: number = 0): number[] {
  return Array(count).fill(v)
}

function now(): number {
  return new Date().getTime()
}
