/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
    ],
    theme: {
        extend: {
            dropShadow: {
                'black': '0 0 15px #000',
                'primary': '0 0 15px #3E62AE',

            },

            colors: {
                primary: '#FFF'
            },
            screens: {
                xs: '300px'
            }
        },
    },
    plugins: [],
}