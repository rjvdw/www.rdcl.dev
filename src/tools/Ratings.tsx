import React, { ChangeEvent, useId, useState } from 'react'
import { Title } from '../components/Title'

const YOUTUBE_LINK = 'https://www.youtube.com/watch?v=8idr1WZ1A7Q&t=107'

export const Ratings = () => {
  const id = useId()

  const [nrPositive, setNrPositive] = useState<number | ''>(19)
  const [nrTotal, setNrTotal] = useState<number | ''>(20)

  const nrPositiveNr = nrPositive === '' ? 0 : nrPositive
  const nrTotalNr = nrTotal === '' ? 0 : nrTotal

  if (nrPositiveNr > nrTotalNr) setNrPositive(nrTotal)

  const percentage = nrTotalNr ? (100 * nrPositiveNr / nrTotalNr).toFixed(2) : '∞'
  const score = (100 * (nrPositiveNr + 1) / (nrTotalNr + 2)).toFixed(2)

  return <>
    <Title prefix="tools">ratings</Title>
    <h1>How to read a rating</h1>

    <p>
      Based on &quot;<a target="_blank" rel="noopener noreferrer" href={ YOUTUBE_LINK }>Which rating is better,
      mathematically speaking?</a>&quot;.
    </p>

    <rdcl-input-grid suffix>
      <label data-start={ 1 } htmlFor={ `${ id }:rating-positive` }>Good reviews</label>
      <input
        id={ `${ id }:rating-positive` }
        data-testid="rating-positive"
        type="number"
        inputMode="numeric"
        step="1"
        min={ 0 }
        max={ nrTotal }
        value={ nrPositive }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => setNrPositive(event.target.value === '' ? '' : +event.target.value) }
      />

      <label data-start={ 1 } htmlFor={ `${ id }:rating-total` }>Total reviews</label>
      <input
        id={ `${ id }:rating-total` }
        data-testid="rating-total"
        type="number"
        inputMode="numeric"
        step="1"
        min={ +nrPositive }
        value={ nrTotal }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => setNrTotal(event.target.value === '' ? '' : +event.target.value) }
      />

      <hr data-span={ 2 }/>

      <label data-start={ 1 } htmlFor={ `${ id }:rating-percentage` }>Percentage</label>
      <input
        id={ `${ id }:rating-percentage` }
        data-testid="rating-percentage"
        readOnly
        value={ percentage }
      />
      <label htmlFor={ `${ id }:rating-percentage` }>%</label>

      <label data-start={ 1 } htmlFor={ `${ id }:rating-score` }>Score</label>
      <input
        id={ `${ id }:rating-score` }
        data-testid="rating-score"
        readOnly
        value={ score }
      />
      <label htmlFor={ `${ id }:rating-score` }>%</label>
    </rdcl-input-grid>
  </>
}

export default Ratings
