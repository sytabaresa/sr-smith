const path = require('path')
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')
const withTM = require('next-transpile-modules')(['react-robot'])

const {
    i18n
} = require('./next-i18next.config');

module.exports = withPlugins([withTM, withPWA], {
    // other next config
    webpack: (config, options) => {
        if (options.isServer) {
            config.externals = ['react', ...config.externals];
        }

        config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

        config.module.rules.push({

            test: /\.node$/,

            use: [

                {

                    loader: "node-loader"

                },

            ],

        })

        return config
    },
    i18n,
})