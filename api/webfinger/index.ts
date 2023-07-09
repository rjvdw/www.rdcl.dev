import axios from 'axios'
import data, { Account } from './data'
import { mergeJrd } from './merge'
import { JRD } from './types'

/**
 * Get the WebFinger data for a specific resource, optionally filtered by relations.
 *
 * @param resource
 * @param relations
 */
export async function getData(
  resource: string,
  relations?: string[],
): Promise<JRD | undefined> {
  const account = lookup(resource)
  if (!account) {
    return undefined
  }

  let data = account.base
  if (account.mastodon) {
    const mastodon = await finger(account.mastodon)
    if (mastodon) {
      data = mergeJrd(data, mastodon)
    }
  }

  return {
    ...data,

    // do not return the subject itself as an alias
    aliases: data.aliases?.filter((alias) => alias !== resource),

    // only return the requested relations
    links:
      relations === undefined
        ? data.links
        : data.links?.filter((link) => relations.indexOf(link.rel) !== -1),
  }
}

/**
 * Look up an account in the available data, resolving any aliases if possible.
 *
 * @param account
 */
function lookup(account: string): Account | undefined {
  let result = data[account]

  while (result?.type === 'alias') {
    result = data[result.alias]
  }

  return result
}

/**
 * Perform a WebFinger request to some other instance.
 *
 * @param profile
 */
async function finger(profile: string): Promise<JRD | undefined> {
  const [, instance] = profile.split('@')
  const url = `https://${instance}/.well-known/webfinger?resource=acct:${profile}`
  const result = await axios.get(url)

  if (result.status !== 200) {
    console.error(
      `Request to '${url}' failed with: ${result.status} ${result.statusText}`,
    )
    return undefined
  }

  return result.data as JRD
}
