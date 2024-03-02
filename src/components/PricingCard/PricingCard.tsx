import styles from './PricingCard.module.scss'
import { IPricing } from '@/intefaces/Pricing.interface'
import Image from 'next/image'
import NavigationLink from '../ui/NavigationLink/NavigationLink'
import { useTranslations, useLocale } from 'next-intl'

import { AiOutlineThunderbolt } from 'react-icons/ai'
import { TbZoomMoney } from 'react-icons/tb'
import { HiOutlineReceiptPercent } from 'react-icons/hi2'
import MostPopular from '@/assets/box-2.svg'
import BestOffer from '@/assets/box-1.svg'
import Discount from '@/assets/box.svg'

export default function PricingCard({ data }: { data: IPricing }) {
  const t = useTranslations('Pricing')
  const localActive = useLocale()

  return (
    <div className={styles.card}>
      <div>
        <h6>{`${data.duration === 'years' ? '3 ' : data.duration === 'year' ? '1 ' : ''}${t(data.duration)}`}</h6>
        <div className={styles.title}>
          <h3>{data.price === 'free' ? t(data.price) : data.price}</h3>{' '}
          {data.previousPrice && <span>{data.previousPrice}</span>}
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
              {t(item.text)}
            </li>
          ))}
        </ul>
      </div>

      <NavigationLink className={`${data.price === 'free' && styles.outline}`} href='/'>
        {data.price === 'free' ? t('current') : t('sign_in')}
      </NavigationLink>

      {data.duration === 'year' && (
        <div className={styles.popular}>
          <Image src={MostPopular} alt='' />
          <p>{t('most_popular')}</p>
        </div>
      )}

      {data.previousPrice && (
        <div className={styles.discount}>
          <Image src={Discount} alt='' />
          <p>30%</p>
        </div>
      )}

      {data.duration === 'years' && (
        <div className={styles.best}>
          <Image src={BestOffer} alt='' />
          <p className={`${localActive === 'ua' && styles.changed}`}>{t('best_offer')}</p>
        </div>
      )}
    </div>
  )
}
