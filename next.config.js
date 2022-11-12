// const withTM = require('next-transpile-modules')(['react-robot'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: false,
})

module.exports = withBundleAnalyzer(withPWA({

}))