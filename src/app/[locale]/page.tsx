import { useTranslations } from 'next-intl'
import AdvantageItem from '@/components/AdvantageItem/AdvantageItem'
import { DAdvantages } from '@/mock/Advantages.mock'
import { DPremAdvantages } from '@/mock/Advantages.mock'
import styles from './MainPage.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import UserReview from '@/components/UserRevies/UserReview'
import { Button } from '@/components/ui/Button/Button'

import { TiTickOutline } from 'react-icons/ti'
import premiumImage from '@/assets/figure-01.png'
import app from '@/assets/app.png'
import gif from '@/assets/langeek-demo-min.gif'
import pluses from '@/assets/pattern-3.svg'
import line from '@/assets/line.svg'

import user1 from '@/assets/16.png'
import user2 from '@/assets/26.png'
import user3 from '@/assets/22.png'
import user4 from '@/assets/10.png'
import user5 from '@/assets/18.png'
import user6 from '@/assets/27.png'
import user7 from '@/assets/31.png'
import user8 from '@/assets/21.png'
import user9 from '@/assets/6.png'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h2>
            {t('learn_with')}
            <span className={styles.title}> Lynad</span>
            <span>Learn</span>
          </h2>
          <p>{t('lynadLearn_is_learning')}</p>
        </div>

        <div className={styles.info}>
          <div className={styles.diagram}>
            <div className={styles.circle}>
              <div>
                <div></div>
              </div>
            </div>
            <div className={styles['person-one']}>
              <Image src={user1} alt='user'></Image>
            </div>
            <div className={styles['person-two']}>
              <Image src={user2} alt='user'></Image>
            </div>
            <div className={styles['person-three']}>
              <Image src={user3} alt='user'></Image>
            </div>
            <div className={styles['person-four']}>
              <Image src={user4} alt='user'></Image>
            </div>
            <div className={styles['person-five']}>
              <Image src={user5} alt='user'></Image>
            </div>
            <div className={styles['person-six']}>
              <Image src={user6} alt='user'></Image>
            </div>
            <div className={styles['person-seven']}>
              <Image src={user7} alt='user'></Image>
            </div>
            <div className={styles['person-eight']}>
              <Image src={user8} alt='user'></Image>
            </div>
            <div className={styles['person-nine']}>
              <Image src={user9} alt='user'></Image>
            </div>
          </div>
          <div className={styles.users}>
            <h3>{t('join_thousands')}</h3>
            <p>{t('lynadLearn_is_learning')}</p>
            <div className={styles.advantages}>
              {DAdvantages.map((item) => (
                <AdvantageItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.help}>
          <div className={styles['description']}>
            <h3>{t('how_can_AI_help')}</h3>
            <p>{t('by_processing_the_structure')}</p>
            <Button> {t('try_it')}</Button>
          </div>
          <div className={styles.image}>
            <Image className={styles.back} src={pluses} alt='' />
            <div className={styles.rect} />
            <Image className={styles.front} src={gif} alt='' />
          </div>
        </div>

        <div className={styles.premium}>
          <div>
            <div className={styles.description}>
              <h3>{t('premium_learning_experience')}</h3>
              {DPremAdvantages.map((item) => (
                <div className={styles.item} key={item}>
                  <TiTickOutline />
                  <p>{t(`${item}`)}</p>
                </div>
              ))}
              <NavigationLink href='/pricing'>{t('premium')}</NavigationLink>
            </div>
            <div className={styles.image}>
              <Image src={premiumImage} alt='premium image' />
            </div>
          </div>
        </div>

        <div className={styles.review}>
          <div>
            <h3>{t('user_reviews')}</h3>
            <UserReview />
          </div>
        </div>

        <div className={styles.download}>
          <div className={styles.info}>
            <h3>{t('download_mobile_app')}</h3>
            <Image src={line} alt='line' />
            <p>{t('install_app')}</p>
            <NavigationLink href='/mobile-app'>{t('download')}</NavigationLink>
          </div>
          <Image src={app} alt='App' className={styles.image} />
        </div>
      </div>
    </>
  )
}
