const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify').default

module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)
  on('file:preprocessor',
    browserify(config, {
      typescript: require.resolve('typescript'),
    }),
  )
  return config;
};