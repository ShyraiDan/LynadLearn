import { useTranslations } from 'next-intl'
import AdvantageItem from '@/components/AdvantageItem/AdvantageItem'
import { DAdvantages } from '@/mock/Advantages.mock'
import { DPremAdvantages } from '@/mock/Advantages.mock'
import styles from './MainPage.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import UserReview from '@/components/UserRevies/UserReview'

import { TiTickOutline } from 'react-icons/ti'
import premiumImage from '@/assets/figure-01.png'
import app from '@/assets/app.png'

export default function Home() {
  const t = useTranslations('Index')

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h2>
            Learn With
            <span className={styles.title}> Lynad</span>
            <span>Learn</span>
          </h2>
          <p>LynadLearn is a language learning platform that helps you learn easier, faster and smarter.</p>
        </div>

        <div className={styles.info}>
          <div></div>
          <div className={styles.users}>
            <h3>Join thousands of users on LanGeek</h3>
            <p>LanGeek is a language learning platform that helps you learn easier, faster and smarter.</p>

            <div className={styles.advantages}>
              {DAdvantages.map((item) => (
                <AdvantageItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.premium}>
          <div>
            <div className={styles.description}>
              <h3>Premium Learning Experience</h3>
              {DPremAdvantages.map((item) => (
                <div className={styles.item} key={item}>
                  <TiTickOutline />
                  <p>{item}</p>
                </div>
              ))}
              <NavigationLink href='/pricing'>Premium</NavigationLink>
            </div>
            <div>
              <Image src={premiumImage} alt='premium image'></Image>
            </div>
          </div>
        </div>
        <div className={styles.review}>
          <div>
            <h3>Users Reviews</h3>
            <UserReview />
          </div>
        </div>
        <div className={styles.download}>
          <div className={styles.info}>
            <h3>Download Mobile Application</h3>
            <p>Install the LynadLearn application on your mobile and learn the language you want.</p>
            <NavigationLink href='/mobile-app'>Download</NavigationLink>
          </div>
          <Image src={app} alt='App' className={styles.image} />
        </div>
      </div>
    </>
  )
}