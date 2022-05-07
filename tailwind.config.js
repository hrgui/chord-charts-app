module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
