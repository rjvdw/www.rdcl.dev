import { FormEventHandler, useState } from 'react'
import { useNotify } from '../../components/Notifications'

export const useUuid = () => {
  const notify = useNotify()
  const [uuid, setUuid] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const generate = (): string => {
    try {
      const next = crypto.randomUUID()
      setUuid(next)
      if (uuid) {
        setHistory([uuid].concat(history))
      }
      return next
    } catch (err) {
      console.error(err)
      notify.error(`Failed to generate UUID: ${errorMessage(err)}`)
      return ''
    }
  }

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    generate()
  }

  const copy = async (nextUuid?: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(nextUuid ?? uuid)
      notify('UUID copied to clipboard')
    } catch (err) {
      console.error(err)
      notify.error(`Failed to copy UUID to clipboard: ${errorMessage(err)}`)
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

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message
  }

  return String(err)
}
