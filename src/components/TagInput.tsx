import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Label } from './Label'

type TagInputProps = {
  tags: string[]
  suggested?: string[]
} & InputHTMLAttributes<HTMLInputElement>

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    { tags: initial, suggested = [], ...inputProps },
    forwardedRef
  ) {
    const id = useId()
    const innerRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>('')
    const [tags, setTags] = useState<string[]>(initial)

    type RefType = typeof innerRef.current
    useImperativeHandle<RefType, RefType>(forwardedRef, () => innerRef.current)

    const suggestions = useMemo(
      () => suggested.filter((v) => tags.indexOf(v) === -1),
      [suggested, tags]
    )

    const focusHandler = () => {
      inputRef.current?.focus()
    }

    const handleUpdatedValue = (value: string, split = false) => {
      if (innerRef.current) {
        innerRef.current.value = tags.concat(value).filter(Boolean).join(', ')
      }
      if (split) {
        const newTag = value
        setTags((t) => t.concat(newTag).filter(Boolean))
        value = ''
      }
      setValue(value)
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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

    const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (
      event
    ) => {
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

    const handleInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
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
      <div className="tag-input" onFocus={focusHandler} tabIndex={0}>
        <datalist id={`${id}:suggested-tags`}>
          {suggestions.map((label) => (
            <option key={label} value={label} />
          ))}
        </datalist>

        <input
          className="tag-input__actual"
          {...inputProps}
          ref={innerRef}
          defaultValue={tags.join(', ')}
          onFocus={(event) => {
            focusHandler()
            inputProps.onFocus?.(event)
          }}
        />

        {tags.map((tag, i) => (
          <Label key={`${i}:${tag}`}>{tag}</Label>
        ))}

        <input
          ref={inputRef}
          className="tag-input__input"
          type="text"
          value={value}
          list={`${id}:suggested-tags`}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          size={value.length || 1}
        />
      </div>
    )
  }
)
