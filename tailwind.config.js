/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        'hero-pattern': "url('https://mdbootstrap.com/img/Photos/Slides/img%20(10).jpg')",
        'dorado': '#c0a84e',
        'dorado-light': '#c0a84ee0',
        'dorado-super-light': '#e5cb69',
        'dorado-ph': '#c0a84e59',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),

  ]
}
