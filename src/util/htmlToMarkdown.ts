import { ClipboardEventHandler } from 'react'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

const PARSER = unified().use(rehypeParse).use(rehypeRemark).use(remarkStringify)

export async function htmlToMarkdown(html: string): Promise<string> {
  return String(await PARSER.process(html))
}

export const htmlToMarkdownPasteHandler: ClipboardEventHandler<
  HTMLTextAreaElement
> = async (event) => {
  event.preventDefault()
  const html = event.clipboardData.getData('text/html')
  const markdown = await htmlToMarkdown(html)
  const target = event.target as HTMLTextAreaElement
  target.value = markdown.trim()
}
