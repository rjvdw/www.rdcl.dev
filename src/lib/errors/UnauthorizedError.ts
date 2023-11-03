import { ApiError } from './ApiError'

type ToResponseConfig = {
  redirect(url: string): Response
  url: URL
}

export class UnauthorizedError extends ApiError {
  constructor(response: Response) {
    super('not authorized', response)
  }

  toRedirectUrl(url: URL | Location): string {
    const redirectUrl = new URL(url.origin + '/login')
    const origin = url.href.replace(url.origin, '')
    redirectUrl.searchParams.set('return-to', origin)

    return redirectUrl.toString()
  }

  toResponse({ redirect, url }: ToResponseConfig): Response {
    return redirect(this.toRedirectUrl(url))
  }
}
