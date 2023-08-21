import { useEffect, useState } from 'preact/hooks'

export const useIp = (address: string) => {
  const [loading, setLoading] = useState(false)
  const [ip, setIp] = useState<string>()

  useEffect(() => {
    setLoading(true)
    getIp(address)
      .then(setIp, (err) => console.error(err))
      .finally(() => setLoading(false))
  }, [address])

  return { loading, ip }
}

async function getIp(address: string): Promise<string> {
  const response = await fetch(address)

  if (!response.ok) {
    throw new Error(
      `Request to ${address} failed with ${response.status} ${response.statusText}`,
    )
  }

  return response.text()
}
