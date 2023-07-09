import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeLabels,
  LabelConfig,
  selectLabels,
} from '../../slices/labels'
import { StoreDispatch } from '../../store'
import './styles.sass'

type LabelProps = {
  children: string
  as?: 'li'
  labels?: Record<string, LabelConfig>
}

export const Label: FunctionComponent<LabelProps> = ({
  as,
  children: label,
  labels: providedLabels,
}) => {
  const dispatch = useDispatch<StoreDispatch>()
  const labelsFromState = useSelector(selectLabels)

  useEffect(() => {
    dispatch(initializeLabels())
  }, [dispatch])

  const labels = useMemo(
    () => providedLabels ?? labelsFromState,
    [providedLabels, labelsFromState],
  )

  const attrs = useMemo(
    () => ({
      className: 'label',
      style: {
        backgroundColor: labels[label]?.['background-color'] ?? '#ddd',
        color: labels[label]?.color ?? '#000',
      },
    }),
    [labels, label],
  )

  if (as === 'li') {
    return <li {...attrs}>{label}</li>
  }

  return <span {...attrs}>{label}</span>
}
