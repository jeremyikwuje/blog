const colors = require('tailwindcss/colors')

module.exports = {
    content: ["content/**/*.md", "layouts/**/*.html"],
    theme: {
      extend: {},
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'black': colors.black,
        'white': colors.white,
        'gray': colors.gray,
        'blue': colors.blue,
        'indigo': colors.indigo,
        'yellow': colors.yellow,
        'green': colors.green,
        'red': colors.red,
        'primary': '#4409EF'
      },
    },
    plugins: [
      require('flowbite-typography'),
    ],
};