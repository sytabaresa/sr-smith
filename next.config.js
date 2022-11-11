const withPWA = require('next-pwa')
// const withTM = require('next-transpile-modules')(['react-robot'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withPWA({

}))