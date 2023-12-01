/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./index.html",
    // './public/**/*.html',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{}
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

