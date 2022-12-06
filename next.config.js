// const withTM = require('next-transpile-modules')(['react-robot'])
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

// for tailwind constant in build time:
// const createNextPluginPreval = require('next-plugin-preval/config');
// const withNextPluginPreval = createNextPluginPreval();

// using preact
// const withPreact = require('next-plugin-preact');


const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: false,
    reloadOnOnline: false, // better to not lost work in canvas 
    // cacheOnFrontEndNav: true,
    runtimeCaching: require('./sw/cache.js'),
    customWorkerDir: './src/modules/pwa/workers'
})

module.exports =
    withBundleAnalyzer(
        // withNextPluginPreval(
        withPWA(
            // withPreact(
            {

            }
            // )
        )
    )
// )