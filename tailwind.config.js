/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: {
    relative: true,
    files: [
      './src/app/**/*.html',
      './src/app/**/*.js',
      './src/app/**/*.ts',
      './src/index.html',
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
