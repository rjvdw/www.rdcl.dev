import { createContext, FunctionComponent } from 'preact'
import { useContext, useEffect } from 'preact/hooks'

const BASE_TITLE = getOriginalTitle()

const TCtx = createContext<string[]>(BASE_TITLE ? [BASE_TITLE] : [])

export type PageTitleProps = {
  children?: string
}

const PageTitleComponent = ({ children: title }: PageTitleProps) => {
  const ctx = useContext(TCtx)

  useEffect(() => {
    let parts = ctx
    if (title) {
      parts = [title].concat(parts)
    }

    document.title = parts.join(' | ')
  }, [title, ctx])

  return null
}

export type PageTitleProviderProps = {
  title: string
}

const PageTitleProvider: FunctionComponent<PageTitleProviderProps> = ({
  title,
  children,
}) => {
  const parts = [title].concat(useContext(TCtx))

  return <TCtx.Provider value={parts}>{children}</TCtx.Provider>
}

export const PageTitle = Object.assign(PageTitleComponent, {
  Provider: PageTitleProvider,
})

function getOriginalTitle(): string | null {
  const title = document.querySelector('title')

  if (!title) return null
  if (title.dataset.originalTitle) return title.dataset.originalTitle

  title.dataset.originalTitle = document.title
  return document.title
}
