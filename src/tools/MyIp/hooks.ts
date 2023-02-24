import { useEffect, useState } from 'react'

export const useIp = (address: string) => {
  const [loading, setLoading] = useState(false)
  const [ip, setIp] = useState<string>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await fetch(address)
        if (response.ok) {
          setIp(await response.text())
        } else {
          setIp(undefined)
          console.error(
            `Request to ${address} failed with ${response.status} ${response.statusText}`
          )
        }
      } catch (err) {
        setIp(undefined)
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [address])

  return { loading, ip }
}
