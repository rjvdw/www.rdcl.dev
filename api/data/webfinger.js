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
    - https://mastodon.nl/@rdcl
    - https://mastodon.nl/users/rdcl
    - acct:rdcl@pixelfed.de
    - https://pixelfed.de/rdcl
    - https://pixelfed.de/users/rdcl
    - mailto:rj@rdcl.dev
    - acct:me@ruud.online
  links:
    - rel: http://webfinger.net/rel/profile-page
      href: https://www.ruud.online
      type: text/html
    - rel: http://webfinger.net/rel/profile-page
      href: https://github.com/rjvdw
      type: text/html
    - rel: http://webfinger.net/rel/profile-page
      href: https://mastodon.nl/@rdcl
      type: text/html
    - rel: self
      href: https://mastodon.nl/users/rdcl
      type: application/activity+json
    - rel: http://ostatus.org/schema/1.0/subscribe
      template: https://mastodon.nl/authorize_interaction?uri={uri}
    - rel: http://webfinger.net/rel/profile-page
      href: https://pixelfed.de/rdcl
      type: text/html
    - rel: http://schemas.google.com/g/2010#updates-from
      href: https://pixelfed.de/users/rdcl.atom
      type: application/atom+xml
    - rel: self
      href: https://pixelfed.de/users/rdcl
      type: application/activity+json
`)
