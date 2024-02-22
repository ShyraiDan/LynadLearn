import styles from './PricingPage.module.scss'
import PricingCard from '@/components/PricingCard/PricingCard'
import { DPricing } from '@/mock/Pricing.mock'

export default function PricingPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Pricing</h1>
        <div>
          {DPricing.map((item) => (
            <PricingCard key={item.price} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
