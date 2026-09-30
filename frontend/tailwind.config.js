/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#1e1b4b',
          900: '#312e81',
          800: '#3730a3',
          50: '#f5f3ff',
        }
      }
    },
  },
  plugins: [],
}
