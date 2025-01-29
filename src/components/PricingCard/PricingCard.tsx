import styles from './PricingCard.module.scss'
import { IPricing } from '@/interfaces/Pricing.interface'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { AuthModalButton } from '@/components/AuthModalButton/AuthModalButton'

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
    <div className={`${styles.card} dark:bg-[#111C38]`}>
      <div>
        <h6 className="dark:text-grey-600">{`${
          data.duration === 'years' ? '3 ' : data.duration === 'year' ? '1 ' : ''
        }${t(data.duration)}`}</h6>
        <div className={styles.title}>
          <h3 className="dark:text-grey-600">{data.price === 'free' ? t(data.price) : data.price}</h3>{' '}
          {data.previousPrice && <span>{data.previousPrice}</span>}
        </div>
        <ul>
          {data.advantages.map((item) => (
            <li key={item.text} className="dark:text-grey-600">
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
      <AuthModalButton
        className={twMerge(
          'flex justify-center text-center items-center bg-blue-200 font-bold rounded-full text-white-100 transition-all ease-linear duration-150 w-full self-end py-3 px-10 hover:bg-purple-100',
          data.price === 'free' &&
            '!bg-transparent !text-blue-200 !border !border-solid !border-blue-200 !hover:bg-transparent !hover:border-purple-100 !hover:text-purple-100'
        )}
        disabled={data.price === 'free'}
      >
        {data.price === 'free' ? t('current') : t('sign_in')}
      </AuthModalButton>

      {data.duration === 'year' && (
        <div className={styles.popular}>
          <Image src={MostPopular} alt="" />
          <p>{t('most_popular')}</p>
        </div>
      )}

      {data.previousPrice && (
        <div className={styles.discount}>
          <Image src={Discount} alt="" />
          <p>30%</p>
        </div>
      )}

      {data.duration === 'years' && (
        <div className={styles.best}>
          <Image src={BestOffer} alt="" />
          <p className={`${localActive === 'ua' && styles.changed}`}>{t('best_offer')}</p>
        </div>
      )}
    </div>
  )
}
