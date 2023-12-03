import type { JRD } from './types'

export type Account = {
  type: 'account'
  base: JRD
}

export type AccountAlias = {
  type: 'alias'
  alias: string
}

export type AccountRecord = Account | AccountAlias

const data: Record<string, AccountRecord> = {
  'acct:rj@rdcl.dev': {
    type: 'account',
    base: {
      subject: 'acct:rj@rdcl.dev',
      aliases: [
        'https://www.ruud.online',
        'https://github.com/rjvdw',
        'https://pleroma.rdcl.dev/users/rj',
        'acct:rdcl@mastodon.nl',
        'mailto:rj@rdcl.dev',
        'acct:rj@rdcl.dev',
        'acct:me@ruud.online',
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          href: 'https://www.ruud.online',
          type: 'text/html',
        },
        {
          href: 'https://pleroma.rdcl.dev/users/rj',
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
        },
        {
          href: 'https://pleroma.rdcl.dev/users/rj',
          rel: 'self',
          type: 'application/activity+json',
        },
        {
          href: 'https://pleroma.rdcl.dev/users/rj',
          rel: 'self',
          type: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
        },
        {
          rel: 'http://ostatus.org/schema/1.0/subscribe',
          template: 'https://pleroma.rdcl.dev/ostatus_subscribe?acct={uri}',
        },
      ],
    },
  },
  'acct:me@ruud.online': {
    type: 'alias',
    alias: 'acct:rj@rdcl.dev',
  },
  'acct:rdcl@mastodon.nl': {
    type: 'alias',
    alias: 'acct:rj@rdcl.dev',
  },
}

export default data
