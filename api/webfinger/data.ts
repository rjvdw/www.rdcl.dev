import yaml from 'js-yaml'
import { JRD } from './types'

export type Account = {
  type: 'account',
  base: JRD,
  mastodon?: string,
}

export type AccountAlias = {
  type: 'alias',
  alias: string,
}

export type AccountRecord = Account | AccountAlias

const data: Record<string, AccountRecord> = {
  'acct:rj@rdcl.dev': {
    type: 'account',
    // language=yaml
    base: yaml.load(`
      subject: acct:rj@rdcl.dev
      aliases:
        - https://www.ruud.online
        - https://github.com/rjvdw
        - acct:rdcl@mastodon.nl
        - mailto:rj@rdcl.dev
        - acct:rj@rdcl.dev
        - acct:me@ruud.online
      links:
        - rel: http://webfinger.net/rel/profile-page
          href: https://www.ruud.online
          type: text/html
    `) as JRD,
    mastodon: 'rdcl@mastodon.nl',
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
