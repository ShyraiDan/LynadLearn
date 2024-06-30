import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
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
        '2xl': '1440px'
      },
      maxWidth: {
        '1440': '1440px'
      },
      colors: {
        blue: {
          100: '#1b7bd7',
          200: '#0e4aa4',
          300: '#2959a2',
          400: '#f0f4fa',
          500: '#f7f9fc'
        },
        purple: {
          100: '#7b56bd',
          300: '#d3c9eb',
          400: '#efebf7'
        },
        grey: {
          100: '#B8b8b8',
          200: '#fafafa',
          300: '#e6e6e6'
        },
        'white-100': '#f0f4fa',
        orange: '#FFA944',
        red: '#E74C3C'
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
        }
      }
    }
  },
  plugins: []
}
export default config

