// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.jsx",
    "./main.jsx",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 中医调色盘
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F5EDDF',
          300: '#EDE0CC',
        },
        sage: {
          50: '#F4F8F3',
          100: '#E6EFE5',
          200: '#CDDFCB',
          300: '#A8C5A2',
          400: '#7FA87A',
          500: '#5A8A58',
          600: '#476E44',
          700: '#3A5738',
          800: '#2F452D',
          900: '#283927',
        },
        paper: {
          50: '#FBF8F3',
          100: '#F5EFE4',
          200: '#EBDCC9',
          300: '#DEC8AB',
        },
        bark: {
          50: '#FDF8F3',
          100: '#F9EEE0',
          200: '#F0D9C0',
          300: '#E4BE9A',
          400: '#D4A070',
          500: '#C48655',
          600: '#A86540',
          700: '#8B5032',
          800: '#71402C',
          900: '#5E3528',
        },
        moss: {
          50: '#F7FAF5',
          100: '#EBF3E8',
          200: '#D5E7CF',
          300: '#B5D3AD',
          400: '#8AB882',
          500: '#64995A',
          600: '#4C7A45',
          700: '#3D6139',
          800: '#324F30',
          900: '#294129',
        },
        fog: {
          50: '#F8F9F7',
          100: '#EEF1EC',
          200: '#DCE3D9',
          300: '#C4D0C0',
          400: '#A5B59E',
          500: '#879985',
          600: '#6B7C6A',
          700: '#566356',
          800: '#475248',
          900: '#3C443D',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"STSong"', '"SimSun"', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(90, 60, 30, 0.08)',
        'softer': '0 2px 12px -2px rgba(90, 60, 30, 0.06)',
        'breath': '0 8px 40px -8px rgba(90, 60, 30, 0.12)',
        'card': '0 12px 48px -12px rgba(90, 60, 30, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'breath': 'breath 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.015)', opacity: '0.95' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}