import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import './styles.sass'

type DetailsProps = {
  summaryOpen: string
  summaryClosed: string
  children: React.ReactNode
}

export const Details: FunctionComponent<DetailsProps> = ({
  summaryOpen,
  summaryClosed,
  children,
}) => {
  const { ref, open } = useHTMLDetails()

  return (
    <details ref={ref} className="details">
      <summary>{open ? summaryOpen : summaryClosed}</summary>
      {children}
    </details>
  )
}

function useHTMLDetails() {
  const ref = useRef<HTMLDetailsElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const { current: details } = ref

    if (details) {
      const toggle = () => setOpen(details.open)
      details.addEventListener('toggle', toggle)
      return () => details.removeEventListener('toggle', toggle)
    }
  }, [])

  return { ref, open }
}
