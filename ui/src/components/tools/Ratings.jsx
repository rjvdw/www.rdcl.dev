import React, { useState } from 'react'

const YOUTUBE_LINK = "https://www.youtube.com/watch?v=8idr1WZ1A7Q&t=107"

export const Ratings = () => {
  const [nrPositive, setNrPositive] = useState(19)
  const [nrTotal, setNrTotal] = useState(20)

  if (nrPositive > nrTotal) setNrPositive(nrTotal)

  const percentage = nrTotal ? (100 * nrPositive / nrTotal).toFixed(2) : '∞'
  const score = (100 * (nrPositive + 1) / (nrTotal + 2)).toFixed(2)

  return <>
    <h1>How to read a rating</h1>

    <p>
      Based on "<a target="_blank" rel="noopener noreferrer" href={ YOUTUBE_LINK }>Which rating is better,
      mathematically speaking?</a>".
    </p>

    <rdcl-input-grid suffix>
      <label data-start={ 1 } htmlFor="rating-positive">Good reviews</label>
      <input
        id="rating-positive"
        type="number"
        inputMode="numeric"
        step="1"
        min={ 0 }
        max={ nrTotal }
        value={ nrPositive }
        onChange={ event => setNrPositive(event.target.value === '' ? '' : +event.target.value) }
      />

      <label data-start={ 1 } htmlFor="rating-total">Total reviews</label>
      <input
        id="rating-total"
        type="number"
        inputMode="numeric"
        step="1"
        min={ +nrPositive }
        value={ nrTotal }
        onChange={ event => setNrTotal(event.target.value === '' ? '' : +event.target.value) }
      />

      <hr data-span={ 2 }/>

      <label data-start={ 1 } htmlFor="rating-percentage">Percentage</label>
      <input
        id="rating-percentage"
        readOnly
        value={ percentage }
      />
      <label htmlFor="rating-percentage">%</label>

      <label data-start={ 1 } htmlFor="rating-score">Score</label>
      <input
        id="rating-score"
        readOnly
        value={ score }
      />
      <label htmlFor="rating-score">%</label>
    </rdcl-input-grid>
  </>
}
