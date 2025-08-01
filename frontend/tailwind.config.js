/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Fredoka', 'sans-serif'],
        'fredoka': ['Fredoka', 'sans-serif'],
        'chewy': ['Chewy', 'cursive'],
      },
    },
  },
  plugins: [],
}

