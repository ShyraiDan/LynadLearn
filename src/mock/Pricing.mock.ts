import { IPricing } from '@/intefaces/Pricing.interface'

export const DPricing: IPricing[] = [
  {
    duration: 'Basic',
    price: 'Free',
    advantages: [
      {
        icon: 'thunder',
        text: 'Quick access to basic features'
      }
    ]
  },
  {
    duration: '1 Year',
    price: '€12',
    tag: 'Most Popular',
    advantages: [
      {
        icon: 'return',
        text: '7-Day money back guarantee'
      },
      {
        icon: 'percent',
        text: 'Vat may apply'
      }
    ]
  },
  {
    duration: '3 Years',
    price: '€24',
    tag: 'Best offer',
    previousPrice: '€36.00',
    advantages: [
      {
        icon: 'return',
        text: '7-Day money back guarantee'
      },
      {
        icon: 'percent',
        text: 'Vat may apply'
      }
    ]
  }
]
