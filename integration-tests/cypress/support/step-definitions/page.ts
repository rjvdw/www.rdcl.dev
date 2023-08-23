import { Then } from '@badeball/cypress-cucumber-preprocessor'
import { Page } from '../page-objects/Page'
import { expectContent } from './util'

Then('the main content matches:', (body: string) => {
  Page.main.then(expectContent(body))
})

Then('the main title matches {string}', (title: string) => {
  Page.h1.then(expectContent(title))
})
