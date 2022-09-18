import React, { ChangeEventHandler, Fragment, useId, useState } from 'react'
import './MarkdownViewer.styles.sass'
import ReactMarkdown from 'react-markdown'
import { Title } from '../components/Title'

type ValidEntry = {
  type: 'valid'
  file: File
  data: string
}

type InvalidEntry = {
  type: 'invalid'
  file: File
  error: string
}

type Entry = ValidEntry | InvalidEntry

export const MarkdownViewer = () => {
  const id = useId()
  const [data, setData] = useState<Entry[]>([])

  const changeHandler: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!event.target.files) {
      return
    }

    const results: Entry[] = []
    for (const file of event.target.files) {
      try {
        results.push({
          type: 'valid',
          file,
          data: await read(file),
        })
      } catch (err) {
        results.push({
          type: 'invalid',
          file,
          error: isError(err)
            ? err.message
            : `error: ${ err }`,
        })
      }
    }
    setData(results)
  }

  return <>
    <Title prefix="tools">markdown viewer</Title>
    <h1>Markdown Viewer</h1>

    <rdcl-input-grid>
      <label htmlFor={ `${ id }:file` }>File:</label>
      <input
        id={ `${ id }:file` }
        data-testid="file"
        type="file"
        multiple
        accept=".md,text/markdown"
        onChange={ changeHandler }
      />
    </rdcl-input-grid>

    { data.map(entry => (
      <Fragment key={ entry.file.name }>
        <h2>File: { entry.file.name }</h2>
        {
          entry.type === 'valid' ? (
            <section
              className="markdown-viewer__output"
              data-testid={ `output-${ entry.file.name }` }
            >
              <ReactMarkdown>{ entry.data }</ReactMarkdown>
            </section>
          ) : (
            <>
              <p
                className="error-message"
                data-testid={ `error-${ entry.file.name }` }
              >
                { entry.error }
              </p>
            </>
          ) }
      </Fragment>
    )) }
  </>
}

export default MarkdownViewer

function read(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    if (file.type !== 'text/markdown') {
      reject(new Error(`Invalid file type: ${ file.type }`))
    }
    reader.addEventListener('load', () => {
      resolve(String(reader.result))
    }, false)
    reader.addEventListener('error', (err) => {
      reject(err)
    })
    reader.readAsText(file)
  })
}

function isError(obj: unknown): obj is { message: string } {
  return typeof obj === 'object' && obj !== null && 'message' in obj
}
