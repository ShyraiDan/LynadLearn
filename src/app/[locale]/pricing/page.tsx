import styles from './PricingPage.module.scss'
import PricingCard from '@/components/PricingCard/PricingCard'
import { DPricing } from '@/mock/Pricing.mock'
import { useTranslations } from 'next-intl'

import { TiTick } from 'react-icons/ti'

export default function PricingPage() {
  const t = useTranslations('Pricing')

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className='dark:text-grey-600'>{t('pricing')}</h1>
        <div>
          {DPricing.map((item) => (
            <PricingCard key={item.price} data={item} />
          ))}
        </div>
      </div>
      <h2 className='dark:text-grey-600'>{t('take_the_next_step')}</h2>
      <p className='dark:text-grey-600'>{t('lynadLearn_basic_membership_offers')}</p>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>{t('compare_plans')}</th>
              <th>{t('free')}</th>
              <th>{t('premium')}</th>
            </tr>
          </thead>
          <tbody>
            {/* 1C2947 */}
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className='dark:text-grey-600'>{t('available_platforms')}</td>
              <td className='dark:text-grey-600'>Web, Android, iOS</td>
              <td className='dark:text-grey-600'>Web, Android, iOS</td>
            </tr>
            <tr className={`${styles.row} `}>
              <td className='dark:text-grey-600'>{t('grammar_library')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className='dark:text-grey-600'>{t('pronunciation_lessons')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
            <tr className={`${styles.row}`}>
              <td className='dark:text-grey-600'>{t('vocabulary_review')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className='dark:text-grey-600'>{t('custom_word_lists')}</td>
              <td className='dark:text-grey-600'>{t('limited')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
            <tr className={`${styles.row}`}>
              <td className='dark:text-grey-600'>{t('advanced_vocabulary_features')}</td>
              <td className='dark:text-grey-600'>{t('limited')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className='dark:text-grey-600'>{t('daily_vocabulary_feature')}</td>
              <td className='dark:text-grey-600'>{t('limited')}</td>
              <td>
                <TiTick className='dark:text-purple-100' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
