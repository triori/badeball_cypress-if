const { defineConfig } = require('cypress')
const testsKeptInMemory = process.env.REVIEW_SLUG ? 0 : 10;

module.exports = defineConfig({
  video: false,
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimation: true,
  animationDistanceTreshold: 20,
  defaultCommandTimeout: 10000,
  execTimeout: 60000,
  pageLoadTimeout: 260000,
  screenshotOnRunFailure: true,
  requestTimeout: 15000,
  responseTimeout: 15000,
  failOnStatusCode: false,
  numTestsKeptInMemory: testsKeptInMemory,
  chromeWebSecurity: false,
  experimentalMemoryManagement: true,
  retries: {
    "runMode": 1,
    "openMode": 0
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: "**/*.feature",
    excludeSpecPattern: ['*.js', '*.md'],
    baseUrl: "https://demoqa.com"
  },
})
