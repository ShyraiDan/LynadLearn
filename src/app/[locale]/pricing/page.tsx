import styles from './PricingPage.module.scss'
import PricingCard from '@/components/PricingCard/PricingCard'
import { DPricing } from '@/mock/Pricing.mock'

import { TiTick } from 'react-icons/ti'

export default function PricingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Pricing</h1>
        <div>
          {DPricing.map((item) => (
            <PricingCard key={item.price} data={item} />
          ))}
        </div>
      </div>
      <h2>Take the next step to achieve your goals</h2>
      <p>
        LanGeek&apos;s Basic membership offers essential language learning tools, while our Premium membership unlocks a
        treasure trove of advanced features and personalized learning experiences.
      </p>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Compare plans</th>
              <th>Free</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Available platforms</td>
              <td>Web, Android, iOS</td>
              <td>Web, Android, iOS</td>
            </tr>
            <tr>
              <td>Grammar Library</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>Pronunciation Lessons</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>Vocabulary review</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>Custom word lists</td>
              <td>limited</td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>Advanced vocabulary features</td>
              <td>limited</td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>Daily vocabulary feature</td>
              <td>limited</td>
              <td>
                <TiTick />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
