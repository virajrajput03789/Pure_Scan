module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradientBG 15s linear infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      backgroundPosition: {
        '0-50': '0% 50%',
        '100-50': '100% 50%',
      },
    },
  },
  plugins: [],
};