import React, { FunctionComponent, MouseEventHandler } from 'react'
import { IconButton } from '../../components/IconButton'
import { Title } from '../../components/Title'
import { useUuid } from './Uuid.hooks'
import './Uuid.styles.sass'

export const Uuid: FunctionComponent = () => {
  const {
    uuid,
    history,
    clearHistory,
    formSubmitHandler,
    generateAndCopy,
    copy,
  } = useUuid()

  const historyDoubleClickHandler: MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault()
    const range = document.createRange()
    range.selectNode(event.target as HTMLLIElement)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }

  return (
    <>
      <Title prefix="tools">uuid</Title>
      <h1>UUID</h1>

      <form onSubmit={formSubmitHandler}>
        <rdcl-input-grid suffix nolabel>
          <input data-testid="uuid" type="text" readOnly value={uuid} />
          <IconButton
            icon="CopyToClipboard"
            data-testid="copy-uuid"
            type="button"
            disabled={!uuid}
            onClick={() => copy()}
            title="Copy UUID to clipboard"
            aria-label="Copy UUID to clipboard"
          />

          <div className="uuid__form-controls" data-span={2}>
            <button name="generate" data-testid="generate-uuid">
              Generate
            </button>
            <button
              name="generate-and-copy"
              data-testid="generate-and-copy-uuid"
              type="button"
              onClick={() => generateAndCopy()}
            >
              Generate and copy
            </button>
          </div>
        </rdcl-input-grid>
      </form>

      {history.length > 0 && (
        <>
          <h2>
            Previous entries{' '}
            <span className="keep-together">
              (<ClearHistory clearHistory={clearHistory} />)
            </span>
          </h2>
          <ul data-testid="uuid-history">
            {history.map((entry) => (
              <li key={entry}>
                <code onDoubleClick={historyDoubleClickHandler}>{entry}</code>{' '}
                <IconButton
                  icon="CopyToClipboard"
                  className="link"
                  onClick={() => copy(entry)}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

type ClearHistoryProps = {
  clearHistory: () => void
}

const ClearHistory: FunctionComponent<ClearHistoryProps> = ({
  clearHistory,
}) => (
  <button onClick={() => clearHistory()} className="link">
    clear
  </button>
)

export default Uuid