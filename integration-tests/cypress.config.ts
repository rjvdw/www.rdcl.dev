/* eslint-disable import/no-unresolved,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call */

import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { defineConfig } from 'cypress'
import cypressLocalStorageCommandsPlugin from 'cypress-localstorage-commands/plugin'

export default defineConfig({
  env: {
    API_URL: process.env.API_URL || 'http://api.localhost',
  },
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: ['cypress/**/*.feature', 'cypress/**/*.spec.*'],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      cypressLocalStorageCommandsPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      )

      // Make sure to return the config object as it might have been modified by the plugin.
      return config
    },
  },
})
