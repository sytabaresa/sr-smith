const withPWA = require('next-pwa')
const { i18n } = require('./next-i18next.config');

module.exports = withPWA({
  // other next config
  i18n,
})