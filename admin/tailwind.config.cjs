/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
      }
    }
  }
};
