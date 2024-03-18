import Image from 'next/image'
import styles from './MobileApp.module.scss'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/Button/Button'
import AdvantageItem from '@/components/AdvantageItem/AdvantageItem'
import { DAdvantages } from '@/mock/Advantages.mock'
import { DSectionLeft, DSectionRight } from '@/mock/Sections.mock'
import { SectionItem } from '@/components/SectionItem/SectionItem'

import { FaGooglePlay, FaApple } from 'react-icons/fa6'
import line from '@/assets/line.svg'
import phone from '@/assets/phone.svg'

export default function MobileApp() {
  const t = useTranslations('')

  return (
    <div className={styles.container}>
      <div className={styles.download}>
        <div className={styles.top}>
          <h1>
            Download{' '}
            <span>
              Lynad<span>Learn </span>
            </span>
            Mobile App
          </h1>
          <Image src={line} alt='line' />
          <p>Have LynadLearn always at hand by downloading our Android or iOS app</p>
          <div>
            <Link href='https://play.google.com/store/games/'>
              <Button>
                <FaGooglePlay size='24' />
                <div>
                  <span>Get it on</span>
                  <p>Google Play</p>
                </div>
              </Button>
            </Link>
            <Link href='https://www.apple.com/app-store/'>
              <Button>
                <FaApple size='28' />
                <div>
                  <span>Get it on</span>
                  <p>App Store</p>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.image}>{/* <Image src={line} alt='line' /> */}</div>
      </div>
      <div className={styles.app}>
        <div>
          <h3>With LanGeek app , language learning will never be a challenge again</h3>
          <p>
            With this app, language learning will never be a challenge again, and you will quickly pursue your dream of
            learning a language.
          </p>
          <div>
            {DAdvantages.map((item) => (
              <AdvantageItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.sections}>
        <h3>Main sections of the application</h3>
        <div className={styles.items}>
          <div className={styles.left}>
            {DSectionLeft.map((item) => (
              <SectionItem key={item.title} {...item} />
            ))}
          </div>
          <div className={styles.center}>
            <div>
              <div>
                <Image src={phone} alt='phone' />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {DSectionRight.map((item) => (
              <SectionItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
