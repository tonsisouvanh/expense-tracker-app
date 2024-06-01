/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00E6F6",
        secondary: "#000000",
      },
      fontFamily: {
        titilliumWeb: ["Titillium Web", "sans-serif"],
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
  important: true,
};
