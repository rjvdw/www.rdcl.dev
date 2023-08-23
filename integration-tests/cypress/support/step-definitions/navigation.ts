import {
  defineParameterType,
  When,
} from '@badeball/cypress-cucumber-preprocessor'
import { Navigation } from '../page-objects/Navigation'

When(
  'the user navigates to the {navigation:page} page',
  (page: keyof typeof Navigation) => {
    Navigation[page].click()
  },
)

defineParameterType({
  name: 'navigation:page',
  regexp: /home|tools/,
  transformer: (s) => s,
})
