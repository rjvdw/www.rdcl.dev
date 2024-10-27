import type { JRD } from './types'
import data, { type Account } from './data'

export async function getData(resource: string, relations: string | null): Promise<JRD | undefined> {
  const account = lookup(resource)
  if (!account) {
    return undefined
  }

  let data = account.base

  const jrd: JRD = {
    ...data,
    subject: resource,
  }

  if (jrd.aliases) {
    // do not return the subject itself as an alias
    jrd.aliases = jrd.aliases.filter((alias) => alias !== resource)
  }

  if (relations && jrd.links) {
    // only return the requested relations
    jrd.links = jrd.links.filter((link) => relations.indexOf(link.rel) !== -1)
  }

  return jrd
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

// /**
//  * Perform a WebFinger request to some other instance.
//  *
//  * @param profile
//  */
// async function finger(profile: string): Promise<JRD | undefined> {
//   const [, instance] = profile.split('@')
//   const url = new URL(`https://${instance}/.well-known/webfinger`)
//   url.searchParams.set('resource', `acct:${profile}`)
//   const result = await fetch(url)

//   if (!result.ok) {
//     console.error(
//       `Request to '${url}' failed with: ${result.status} ${result.statusText}`,
//     )
//     return undefined
//   }

//   const data = (await result.json()) as unknown

//   return data as JRD
// }
