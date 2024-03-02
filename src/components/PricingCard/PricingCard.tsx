import styles from './PricingCard.module.scss'
import { IPricing } from '@/intefaces/Pricing.interface'
import Image from 'next/image'
import NavigationLink from '../ui/NavigationLink/NavigationLink'

import { AiOutlineThunderbolt } from 'react-icons/ai'
import { TbZoomMoney } from 'react-icons/tb'
import { HiOutlineReceiptPercent } from 'react-icons/hi2'
import MostPopular from '@/assets/box-2.svg'
import BestOffer from '@/assets/box-1.svg'
import Discount from '@/assets/box.svg'

export default function PricingCard({ data }: { data: IPricing }) {
  return (
    <div className={styles.card}>
      <div>
        <h6>{data.duration}</h6>
        <div className={styles.title}>
          <h3>{data.price}</h3> {data.previousPrice && <span>{data.previousPrice}</span>}
        </div>
        <ul>
          {data.advantages.map((item) => (
            <li key={item.text}>
              {item.icon === 'return' ? (
                <TbZoomMoney />
              ) : item.icon === 'percent' ? (
                <HiOutlineReceiptPercent />
              ) : (
                <AiOutlineThunderbolt />
              )}
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <NavigationLink className={`${data.price === 'Free' && styles.outline}`} href='/'>
        {data.price === 'Free' ? 'Current' : 'Sign in'}
      </NavigationLink>

      {data.duration === '1 Year' && (
        <div className={styles.popular}>
          <Image src={MostPopular} alt='' />
          <p>Most Popular</p>
        </div>
      )}

      {data.previousPrice && (
        <div className={styles.discount}>
          <Image src={Discount} alt='' />
          <p>30%</p>
        </div>
      )}

      {data.duration === '3 Years' && (
        <div className={styles.best}>
          <Image src={BestOffer} alt='' />
          <p>Best offer</p>
        </div>
      )}
    </div>
  )
}
