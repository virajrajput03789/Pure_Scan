/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        pulse: 'pulse 9s ease-in-out infinite',
        flashburst: 'flashburst 4s ease-in-out infinite',
        spin: 'spin 30s linear infinite',
        scanbeam: 'scanbeam 2s linear infinite',
        shockwave: 'shockwave 1s ease-out',
      },
      keyframes: {
        flashburst: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 0.15 },
        },
        scanbeam: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        shockwave: {
          '0%': { transform: 'scale(0.5)', opacity: 0.6 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
      colors: {
        copilot: {
          bg: '#0f172a',
          accent: '#22c55e',
          glow: '#4ade80',
        },
      },
      blur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '32px',
        '2xl': '60px',
      },
    },
  },
  plugins: [],
}