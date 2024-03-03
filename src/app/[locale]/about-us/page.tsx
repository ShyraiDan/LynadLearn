import Image from 'next/image'
import styles from './AboutUsPage.module.scss'
import { useTranslations } from 'next-intl'

import image from '@/assets/about-us.png'

export default function AboutUsPage() {
  const t = useTranslations('About_us')

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <h6>{t('our_goal')}</h6>
        <h1>{t('improve_language_learning')}</h1>
        <p>{t('we_believe_modern_learning')}</p>
        <div>
          <Image src={image} alt='About LynadLearn' />
        </div>
      </section>
      <div className={styles.main}>
        <section>
          <h2>{t('how_can_AI_help')}</h2>
          <p>{t('a_substantial_part_of_learning')}</p>
          <p>{t('with_the_help_of_AI')}</p>
          <p>{t('to_put_it_simply')}</p>
        </section>
        <section>
          <h2>{t('why_is_learning_difficult')}</h2>
          <p>{t('languages_are_these_huge_chunks')}</p>
          <p>{t('learn_new_language')}</p>
          <p>{t('always_fun_start')}</p>
          <p>{t('if_only_there')}</p>
        </section>
      </div>
      <section className={styles.last}>
        <h2>{t('who_are_we')}</h2>
        <p>{t('we_are_team')}</p>
      </section>
    </div>
  )
}
