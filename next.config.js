const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config');
// const withTM = require('next-transpile-modules')(['react-syntax-highlighter/dist/esm'])

module.exports = withPWA({
  // other next config
  i18n,
})