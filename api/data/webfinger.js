/* eslint-disable */
'use strict'

const yaml = require('js-yaml')

// language=yaml
exports['acct:me@ruud.online'] = exports['acct:rj@rdcl.dev'] = yaml.load(`
  subject: acct:rj@rdcl.dev
  aliases:
    - https://www.ruud.online
    - https://github.com/rjvdw
    - acct:rdcl@mastodon.nl
    - acct:rdcl@pixelfed.de
    - mailto:rj@rdcl.dev
    - acct:me@ruud.online
  links:
    - rel: http://webfinger.net/rel/profile-page
      href: https://www.ruud.online
      type: text/html
`)
