// const withTM = require('next-transpile-modules')(['react-robot'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: false,
    reloadOnOnline: false, // better to not lost work in canvas 
    // cacheOnFrontEndNav: true,
    runtimeCaching: require('./cache.js')
})

module.exports = withBundleAnalyzer(withPWA({

}))