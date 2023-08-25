import { useCallback, useMemo, useRef } from 'preact/hooks'
import { useFormId } from '../../util/form'
import { formatDate } from './dateUtil'

type SearchFromProps = {
  onSubmit(this: void, event: Event): void
  from?: Date
  to?: Date
}

export const SearchForm = ({ onSubmit, from, to }: SearchFromProps) => {
  const id = useFormId()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const open = useMemo(() => Boolean(detailsRef.current?.open), [])

  return (
    <details ref={detailsRef}>
      <summary>{open ? 'Close search' : 'Open search'}</summary>

      <form onSubmit={onSubmit} class="health-search">
        <section class="form-grid" data-suffix={true}>
          <Input id={id('from')} name="from" value={from} />
          <Input id={id('to')} name="to" value={to} />
          <button data-start={2}>Search</button>
        </section>
      </form>
    </details>
  )
}

type InputProps = {
  id: string
  name: string
  value: Date | undefined
}

const Input = ({ id, name, value }: InputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const defaultValue = useMemo(() => (value ? formatDate(value) : ''), [value])

  const clear = useCallback(
    (event: Event) => {
      event.preventDefault()
      if (ref.current) {
        ref.current.value = ''
      }
    },
    [defaultValue],
  )

  return (
    <>
      <label data-start={1} htmlFor={id}>
        From
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type="date"
        defaultValue={defaultValue}
      />
      <button type="button" onClick={clear}>
        Clear
      </button>
    </>
  )
}
