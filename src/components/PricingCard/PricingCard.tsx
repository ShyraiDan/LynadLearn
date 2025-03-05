import styles from './PricingCard.module.scss'
import { IPricing } from '@/interfaces/Pricing.interface'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { AuthModalButton } from '@/components/AuthModalButton/AuthModalButton'
import { H3, H6, P } from '@/components/ui/Typography/Typography'

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
        <H6 className="font-medium text-lg lg:text-2xl mb-0">{`${data.duration === 'years' ? '3 ' : data.duration === 'year' ? '1 ' : ''}${t(data.duration)}`}</H6>
        <div className={styles.title}>
          <H3 className="text-2xl font-bold mb-3 mr-3 lg:text-4xl">
            {data.price === 'free' ? t(data.price) : data.price}
          </H3>{' '}
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
          'flex justify-center text-center items-center bg-blue-200 font-bold rounded-full text-white-100 transition-all ease-linear duration-150 w-full self-end py-3 px-10 lg:hover:bg-purple-100',
          data.price === 'free' &&
            '!bg-transparent !text-blue-200 !border !border-solid !border-blue-200 !lg:hover:bg-transparent !lg:hover:border-purple-100 !lg:hover:text-purple-100 dark:!border-white-100 dark:!text-white-100 dark:lg:hover:!border-white-100 dark:lg:hover:!text-white-100'
        )}
        disabled={data.price === 'free'}
      >
        {data.price === 'free' ? t('current') : t('sign_in')}
      </AuthModalButton>

      {data.duration === 'year' && (
        <div className={styles.popular}>
          <Image src={MostPopular} alt="" />
          <P className="text-xs font-medium absolute top-[11px] left-[15px] text-white-100">{t('most_popular')}</P>
        </div>
      )}

      {data.previousPrice && (
        <div className={styles.discount}>
          <Image src={Discount} alt="" />
          <P className="text-xs font-medium absolute top-[9px] left-[20px] text-white-100">30%</P>
        </div>
      )}

      {data.duration === 'years' && (
        <div className={styles.best}>
          <Image src={BestOffer} alt="" />
          <P
            className={twMerge(
              'text-xs font-medium absolute top-[4px] left-[15px] text-white-100',
              localActive === 'en' && 'top-[11px]'
            )}
          >
            {t('best_offer')}
          </P>
        </div>
      )}
    </div>
  )
}
