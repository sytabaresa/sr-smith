// tsconfig.js
const {
    generatePaths
} = require('tsconfig-paths-autogen');


module.exports = {
    compilerOptions: {
        // ...
        paths: generatePaths(baseUrl, {
            rootAlias: '@',
            maxDirectoryDepth: 2,
            excludeAliasForSubDirectories: ['components'],
            includeAliasForDirectories: {
                common: 'components/common',
            },
        }),
    }
}
onmyjs(module.exports, undefined, true); // export to json