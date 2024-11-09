import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #124798, #7c68ee)'
      },
      screens: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1440px',
        '3xl': '1580px',
        '4xl': '1720px',
        '5xl': '1860px'
      },
      maxWidth: {
        '1440': '1440px'
      },
      colors: {
        blue: {
          100: '#1b7bd7',
          125: '#092550',
          150: '#0e336b',
          200: '#0e4aa4',
          225: '#2a41e812',
          250: '#2e538b',
          300: '#2959a2',
          350: '#6c757d',
          400: '#7b8ba5',
          500: '#f7f9fc',
          600: '#0B152E',
          700: '#18223D',
          800: '#111C38'
        },
        purple: {
          100: '#7b56bd',
          300: '#d3c9eb',
          400: '#efebf7'
        },
        grey: {
          100: '#B8b8b8',
          200: '#fafafa',
          250: '#eeefff',
          275: '#e5e7eb',
          300: '#e6e6e6',
          400: '#ced4da',
          500: '#353738',
          600: '#d4d5d6'
        },
        white: {
          100: '#ffffff',
          200: '#f0f4fa'
        },
        green: {
          100: '#11a762'
        },
        orange: '#ffa944',
        red: '#e74c3c'
      },
      keyframes: {
        pong: {
          '0%, 100%': {
            transform: 'translateY(-10%)'
          },
          '50%': {
            transform: 'none'
          }
        },
        loader: {
          '0%, 100%': {
            transform: 'translate(0)'
          },
          '25%': {
            transform: 'translate(160%)'
          },
          '50%': {
            transform: 'translate(160%, 160%)'
          },
          '75%': {
            transform: 'translate(0, 160%)'
          }
        },
        rotateCard: {
          '0%': {
            transform: 'translate(0)'
          },
          '100%': {
            transform: 'rotateY(180deg)'
          }
        }
      },
      gridTemplateColumns: {
        'auto-fit-140': 'repeat(auto-fit, minmax(140px, 1fr))'
      },
      shadow: {}
    }
  },
  plugins: []
}
export default config
