import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

type TagInputProps = {
  tags: string[]
} & InputHTMLAttributes<HTMLInputElement>

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  { tags: initial, ...inputProps },
  forwardedRef,
) {
  const innerRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')
  const [tags, setTags] = useState<string[]>(initial)

  type RefType = typeof innerRef.current
  useImperativeHandle<RefType, RefType>(forwardedRef, () => innerRef.current)

  const focusHandler = () => {
    inputRef.current?.focus()
  }

  const handleUpdatedValue = (value: string, split = false) => {
    if (innerRef.current) {
      innerRef.current.value = tags.concat(value).filter(Boolean).join(', ')
    }
    if (split) {
      const newTag = value
      setTags(t => t.concat(newTag).filter(Boolean))
      value = ''
    }
    setValue(value)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    handleUpdatedValue(event.target.value)
    if (innerRef.current) {
      inputProps.onChange?.({
        ...event,
        nativeEvent: {
          ...event.nativeEvent,
          target: innerRef.current,
        },
        currentTarget: innerRef.current,
        target: innerRef.current,
      })
    }
  }

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleUpdatedValue((event.target as HTMLInputElement).value, true)
    } else if (event.key === 'Backspace' && value.length === 0) {
      const copied = [...tags]
      const newValue = copied.pop() ?? ''

      setValue(newValue)
      setTags(copied)
    }
  }

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = event => {
    handleUpdatedValue(event.target.value, true)
    if (innerRef.current) {
      inputProps.onBlur?.({
        ...event,
        nativeEvent: {
          ...event.nativeEvent,
          target: innerRef.current,
        },
        currentTarget: innerRef.current,
        target: innerRef.current,
      })
    }
  }

  return (
    <div
      className="tag-input"
      onFocus={ focusHandler }
      tabIndex={ 0 }
    >
      <input
        className="tag-input__actual"
        { ...inputProps }
        ref={ innerRef }
        defaultValue={ tags.join(', ') }
        onFocus={ event => {
          focusHandler()
          inputProps.onFocus?.(event)
        } }
      />

      { tags.map((tag, i) => (
        <span
          key={ `${ i }:${ tag }` }
          className="label"
        >
          { tag }
        </span>
      )) }

      <input
        ref={ inputRef }
        className="tag-input__input"
        type="text"
        value={ value }
        onChange={ handleInputChange }
        onKeyDown={ handleInputKeyDown }
        onBlur={ handleInputBlur }
        size={ value.length || 1 }
      />
    </div>
  )
})
