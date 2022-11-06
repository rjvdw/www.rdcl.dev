import { FormEventHandler, useState } from 'react'

export const useUuid = () => {
  const [uuid, setUuid] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const generate = () => {
    const next = crypto.randomUUID()
    setUuid(next)
    if (uuid) {
      setHistory([uuid].concat(history))
    }
    return next
  }

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    generate()
  }

  const copy = async (nextUuid?: string) => {
    try {
      await navigator.clipboard.writeText(nextUuid ?? uuid)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    uuid,
    supported: !!crypto.randomUUID,
    history,
    clearHistory() {
      setHistory([])
    },
    formSubmitHandler,
    copy,
    async generateAndCopy() {
      await copy(generate())
    },
  }
}
