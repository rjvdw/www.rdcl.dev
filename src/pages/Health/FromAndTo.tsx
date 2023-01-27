import React, { FunctionComponent, useId } from 'react'
import { useForm } from 'react-hook-form'
import { Details } from '../../components/Details'

type FromAndToProps = {
  from?: string
  to?: string
  setSearch(value: SearchState): void
}

export type SearchState = {
  from?: string
  to?: string
}

export const FromAndTo: FunctionComponent<FromAndToProps> = ({
  from,
  to,
  setSearch,
}) => {
  const id = useId()
  const { register, handleSubmit, setValue } = useForm<SearchState>()

  const clear = (key: keyof SearchState) => setValue(key, undefined)

  return (
    <Details summaryOpen="Close search" summaryClosed="Open search">
      <form onSubmit={handleSubmit(setSearch)} className="health__search">
        <rdcl-input-grid suffix>
          <label data-start={1} htmlFor={`${id}:from`}>
            From
          </label>
          <input
            id={`${id}:from`}
            type="date"
            defaultValue={from}
            {...register('from')}
          />
          <button type="button" onClick={() => clear('from')}>
            Clear
          </button>

          <label data-start={1} htmlFor={`${id}:to`}>
            To
          </label>
          <input
            id={`${id}:to`}
            type="date"
            defaultValue={to}
            {...register('to')}
          />
          <button type="button" onClick={() => clear('to')}>
            Clear
          </button>

          <button data-start={2}>Search</button>
        </rdcl-input-grid>
      </form>
    </Details>
  )
}
