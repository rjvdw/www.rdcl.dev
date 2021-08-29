import React from 'react'

type ErrorMessageProps = {
  errors: Array<{
    key: string,
    message: string,
  }>,
  clearErrors: () => void,
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ errors, clearErrors }) => errors.length > 0 ? (
  <section>
    <p>Hm... Het lijkt er op dat er iets mis is gegaan 🤔</p>
    <ul>
      { errors.map(err => <li key={ err.key }>{ err.message }</li>) }
    </ul>
    <button onClick={ clearErrors }>Maak leeg</button>
  </section>
) : <></>
