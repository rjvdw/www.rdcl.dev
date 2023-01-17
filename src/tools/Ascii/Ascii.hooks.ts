import { ChangeEvent, useState } from 'react'

type StateType = {
  text: string
  ascii: string
  radix: 2 | 10 | 16
  error?: Error
}

export const useAscii = () => {
  const [{ text, ascii, radix, error }, setState] = useState<StateType>({
    text: '',
    ascii: '',
    radix: 2,
  })

  const setText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value
    const ascii = toAscii(text, radix)

    setState({ text, ascii, radix, error: undefined })
  }

  const setAscii = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const ascii = event.target.value.toUpperCase()
    let text = ''
    let error = undefined

    try {
      text = fromAscii(ascii, radix)
    } catch (err) {
      if (err instanceof Error) {
        error = err
      } else {
        error = new Error('Unknown error')
      }
    }

    setState({ text, ascii, radix, error })
  }

  const setRadix = (event: ChangeEvent<HTMLInputElement>) => {
    let radix: 2 | 10 | 16
    switch (event.target.value) {
      case '2':
        radix = 2
        break
      case '10':
        radix = 10
        break
      default:
        radix = 16
        break
    }
    const ascii = toAscii(text, radix)

    setState({ text, ascii, radix, error })
  }

  return {
    text,
    setText,
    ascii,
    setAscii,
    radix,
    setRadix,
    error,
  }
}

function toAscii(text: string, radix: 2 | 10 | 16): string {
  return text
    .split('')
    .map((x) => x.codePointAt(0))
    .map((x) => x?.toString(radix) || '')
    .map((x) => x.padStart(getPaddingForRadix(radix), '0'))
    .join(' ')
}

function getPaddingForRadix(radix: 2 | 10 | 16): number {
  switch (radix) {
    case 2:
      return 8
    case 10:
      return 0
    default:
      return 2
  }
}

function fromAscii(ascii: string, radix: 2 | 10 | 16): string {
  return ascii
    .split(' ')
    .filter((x) => x !== '')
    .map((x) => parseInt(x, radix))
    .map((x) => String.fromCodePoint(x))
    .join('')
}
