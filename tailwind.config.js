/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'full-page': "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);",
     },
    },
  },
  plugins: [],
};
