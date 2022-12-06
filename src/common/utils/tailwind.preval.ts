// import preval from 'next-plugin-preval';

export async function getData() {
    const tailwindConfig = require('../../../tailwind.config.js')
    const resolveConfig = require('tailwindcss/resolveConfig')
    const fullConfig = resolveConfig(tailwindConfig)
    return { screens: fullConfig.theme.screens }
}

// export default preval(getData());