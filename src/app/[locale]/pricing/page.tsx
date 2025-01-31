import styles from './PricingPage.module.scss'
import PricingCard from '@/components/PricingCard/PricingCard'
import { DPricing } from '@/mock/Pricing.mock'
import { useTranslations } from 'next-intl'
import { H1, H2, P } from '@/components/ui/Typography/Typography'

import { TiTick } from 'react-icons/ti'

export default function PricingPage() {
  const t = useTranslations('Pricing')

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <H1 className="text-lg font-bold mb-10 sm:text-2xl sm:mb-12 lg:text-[40px] lg:mb-14 dark:text-grey-600">
          {t('pricing')}
        </H1>
        <div>
          {DPricing.map((item) => (
            <PricingCard key={item.price} data={item} />
          ))}
        </div>
      </div>
      <H2 className="mb-4 self-start font-semibold text-base sm:text-lg lg:text-2xl dark:text-grey-600">
        {t('take_the_next_step')}
      </H2>
      <P className="mb-8 self-start text-sm sm:mb-10 sm:text-base lg:mb-20 lg:w-[80%] lg:text-lg dark:text-grey-600">
        {t('lynadLearn_basic_membership_offers')}
      </P>
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
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className="dark:text-grey-600">{t('available_platforms')}</td>
              <td className="dark:text-grey-600">Web, Android, iOS</td>
              <td className="dark:text-grey-600">Web, Android, iOS</td>
            </tr>
            <tr className={`${styles.row} `}>
              <td className="dark:text-grey-600">{t('grammar_library')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className="dark:text-grey-600">{t('pronunciation_lessons')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
            <tr className={`${styles.row}`}>
              <td className="dark:text-grey-600">{t('vocabulary_review')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className="dark:text-grey-600">{t('custom_word_lists')}</td>
              <td className="dark:text-grey-600">{t('limited')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
            <tr className={`${styles.row}`}>
              <td className="dark:text-grey-600">{t('advanced_vocabulary_features')}</td>
              <td className="dark:text-grey-600">{t('limited')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
            <tr className={`${styles.row} dark:odd:bg-[#1C2947]`}>
              <td className="dark:text-grey-600">{t('daily_vocabulary_feature')}</td>
              <td className="dark:text-grey-600">{t('limited')}</td>
              <td>
                <TiTick className="dark:text-purple-100" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
