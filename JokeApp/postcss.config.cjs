// module.exports = {
//   plugins: [
//     require('postcss-preset-env'), // Obsługuje nowoczesne funkcje CSS
//     require('postcss-preset-mantine'), // Jeśli chcesz używać presetów Mantine
//     require('postcss-simple-vars') // Umożliwia używanie zmiennych w CSS
//   ]
// };

module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};