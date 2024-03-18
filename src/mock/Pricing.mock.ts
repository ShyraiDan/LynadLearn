import { IPricing } from '@/interfaces/Pricing.interface'

export const DPricing: IPricing[] = [
  {
    duration: 'basic',
    price: 'free',
    advantages: [
      {
        icon: 'thunder',
        text: 'quick_access'
      }
    ]
  },
  {
    duration: 'year',
    price: '€12',
    tag: 'most_popular',
    advantages: [
      {
        icon: 'return',
        text: 'guarantee'
      },
      {
        icon: 'percent',
        text: 'vat_may'
      }
    ]
  },
  {
    duration: 'years',
    price: '€24',
    tag: 'best_offer',
    previousPrice: '€36.00',
    advantages: [
      {
        icon: 'return',
        text: 'guarantee'
      },
      {
        icon: 'percent',
        text: 'vat_may'
      }
    ]
  }
]
