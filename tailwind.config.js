/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    plugins: [primeui],
    theme: {
        extend: {
            colors: {
                'custom-red': {
                    DEFAULT: '#D80000',
                    hover: '#bf0000',
                    active: '#8c0000',
                    light: {
                        DEFAULT: '#ffe8e8',
                        active: '#ffd3d3'
                    }
                },
            },
            fontFamily: {
                'hiragino': ['"Hiragino Kaku Gothic ProN"', 'sans-serif'],
            },
        },
    }
};
