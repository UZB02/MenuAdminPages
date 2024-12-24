/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // 'xs:' ni 480px o'lchamda belgilaymiz
      },
    },
  },
  plugins: [],
};

