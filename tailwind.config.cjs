/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


const defaultThemeVariables = {
    "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
    "--rounded-btn": "1.9rem", // border radius rounded-btn utility class, used in buttons and similar element
    "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
    "--animation-btn": "0.25s", // duration of animation when you click on button
    "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
    "--btn-text-case": "uppercase", // set default text transform for buttons
    "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
    "--border-btn": "1px", // border width of buttons
    "--tab-border": "1px", // border width of tabs
    "--tab-radius": "0.5rem", // border radius of tabs
    "primary-focus": "#1D293B",
    "--btn-text-case": "uppercase", // set default text transform for buttons
}

module.exports = {
    content: [
        './src/index.html',
        './src/pages/**/*.{jsx,tsx}',
        './src/common/components/**/*.{jsx,tsx}',
        './src/modules/**/*.{jsx,tsx}',
        './src/renderer/**/*.{jsx,tsx}',
    ],
    theme: {
        extend: {
            dropShadow: {
                'white': '0 0 4px rgba(255, 255, 255, 1)',
            },
            theme: {
                maxWidth: {
                    'screen': '100vw'
                },

            },
            fontFamily: {
                'sans': ['Libre Franklin', 'ui-sans-serif', 'system-ui'],
                'serif': ['ui-serif', 'Georgia'],
                'mono': ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
            },
            transitionProperty: {
                'size': 'height, weight',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require('daisyui'),
        require('tailwind-scrollbar')({
            nocompatible: true
        })
    ],
    daisyui: {
        // darkTheme: 'black',
        themes: [
            // {
            {
                light: {
                    // ...require("daisyui/src/colors/themes")["[data-theme=pastel]"],
                    "color-scheme": "light",
                    "primary": "#0D0D0D",
                    "primary-content": "#ffffff",
                    "secondary": "#1A1919",
                    "secondary-content": "#ffffff",
                    "accent": "#262626",
                    "accent-content": "#ffffff",
                    "neutral": "#000000",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#F2F2F2",
                    "base-300": "#E6E5E5",
                    "base-content": "#000000",
                    "info": "#0070F3",
                    "info-content": "#ffffff",
                    "success": "#21CC51",
                    "success-content": "#ffffff",
                    "warning": "#FF6154",
                    "warning-content": "#ffffff",
                    "error": "#DE1C8D",
                    "error-content": "#ffffff",
                    ...defaultThemeVariables
                },
            },
            {
                dark: {
                    // ...require("daisyui/src/colors/themes")["[data-theme=black]"],
                    "color-scheme": "dark",
                    primary: "#999",
                    secondary: "#343232",
                    accent: "#343232",
                    "base-100": "#000000",
                    "base-200": "#0D0D0D",
                    "base-300": "#1A1919",
                    "base-content": "#CCC",
                    neutral: "#272626",
                    "neutral-focus": "#ffffff",
                    info: "#0000ff",
                    success: "#008000",
                    warning: "#ffff00",
                    error: "#ff0000",
                    ...defaultThemeVariables,
                    ".modal": {
                        "background-color": "#0007",
                    }
                },
            },
        ],
    },
}