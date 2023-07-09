import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import './styles.sass'

type DetailsPropsWithSummary = {
  summary: string
}

type DetailsPropsWithSummaryOpenAndClosed = {
  summaryOpen: string
  summaryClosed: string
}

type DetailsProps = (
  | DetailsPropsWithSummary
  | DetailsPropsWithSummaryOpenAndClosed
) & {
  children: React.ReactNode
}

function isDetailsPropsWithSummary(
  props: DetailsPropsWithSummary | DetailsPropsWithSummaryOpenAndClosed,
): props is DetailsPropsWithSummary {
  return (props as DetailsPropsWithSummary).summary !== undefined
}

export const Details: FunctionComponent<DetailsProps> = ({
  children,
  ...props
}) => {
  const { ref, open } = useHTMLDetails()
  const summary = isDetailsPropsWithSummary(props)
    ? props.summary
    : open
    ? props.summaryOpen
    : props.summaryClosed

  return (
    <details ref={ref} className="details">
      <summary>{summary}</summary>
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
