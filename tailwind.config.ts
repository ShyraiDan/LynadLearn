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
          300: '#2959a2'
        },
        purple: '#7b56bd',
        grey: '#B8b8b8',
        'white-100': '#f0f4fa',
        orange: '#FFA944'
      }
    }
  },
  plugins: []
}
export default config

