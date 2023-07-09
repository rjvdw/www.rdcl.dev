import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify'
import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'o4io9b',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: ['cypress/**/*.feature', 'cypress/**/*.spec.*'],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        browserify(config, {
          typescript: require.resolve('typescript'),
        }),
      )

      // Make sure to return the config object as it might have been modified by the plugin.
      return config
    },
  },
})
