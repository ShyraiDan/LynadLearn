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
        <h1>{t('pricing')}</h1>
        <div>
          {DPricing.map((item) => (
            <PricingCard key={item.price} data={item} />
          ))}
        </div>
      </div>
      <h2>{t('take_the_next_step')}</h2>
      <p>{t('lynadLearn_basic_membership_offers')}</p>
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
            <tr>
              <td>{t('available_platforms')}</td>
              <td>Web, Android, iOS</td>
              <td>Web, Android, iOS</td>
            </tr>
            <tr>
              <td>{t('grammar_library')}</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>{t('pronunciation_lessons')}</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>{t('vocabulary_review')}</td>
              <td>
                <TiTick />
              </td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>{t('custom_word_lists')}</td>
              <td>{t('limited')}</td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>{t('advanced_vocabulary_features')}</td>
              <td>{t('limited')}</td>
              <td>
                <TiTick />
              </td>
            </tr>
            <tr>
              <td>{t('daily_vocabulary_feature')}</td>
              <td>{t('limited')}</td>
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
