import {
  defineParameterType,
  When,
} from '@badeball/cypress-cucumber-preprocessor'
import { Navigation } from '../page-objects/Navigation'
import { Tools } from '../page-objects/Tools'

When('the user navigates to the {tools:tool} tool', (tool: string) => {
  Navigation.tools.click()
  Tools.getToolLinkByHref(tool).click()
})

defineParameterType({
  name: 'tools:tool',
  regexp: /countdown|drop rates|my ip/,
  transformer: (s) => {
    return `/tools/${s.replace(/ /g, '-')}`
  },
})
