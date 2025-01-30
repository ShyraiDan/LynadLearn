import Image from 'next/image'
import styles from './MobileApp.module.scss'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Button from '@/components/ui/Button/Button'
import AdvantageItem from '@/components/AdvantageItem/AdvantageItem'
import { DAdvantages } from '@/mock/Advantages.mock'
import { DSectionLeft, DSectionRight } from '@/mock/Sections.mock'
import { SectionItem } from '@/components/SectionItem/SectionItem'
import Accordion from '@/components/Accordion/Accordion'
import UserReview from '@/components/UserRevies/UserReview'
import Features from '@/components/Features/Features'

import { FaGooglePlay, FaApple } from 'react-icons/fa6'
import line from '@/assets/line.svg'
import phone from '@/assets/phone.svg'
import faq from '@/assets/faq.svg'
import installPc from '@/assets/app-download.png'
import installMd from '@/assets/app-tablet.png'
import installSm from '@/assets/app-mobile.png'
import message from '@/assets/massage-arrow.svg'
import vocabulary from '@/assets/vocabulary.png'
import gif from '@/assets/langeek-demo-min.gif'
import pluses from '@/assets/pattern-3.svg'

export default function MobileApp() {
  const t = useTranslations('Mobile_app')

  return (
    <div className={styles.container}>
      <div className={styles.download}>
        <div className={styles.top}>
          <h1 className={`${styles.title} dark:text-grey-600`}>
            {t('download')}{' '}
            <span>
              Lynad<span>Learn </span>
            </span>
            {t('mobile_app')}
          </h1>
          <Image src={line} alt="line" />
          <p className="dark:text-grey-600">{t('always_download')}</p>
          <div>
            <Link href="https://play.google.com/store/games/">
              <Button className="hover:!bg-[#E0E0E0]">
                <FaGooglePlay size="24" />
                <div>
                  <span>{t('get_it_on')}</span>
                  <p>Google Play</p>
                </div>
              </Button>
            </Link>
            <Link href="https://www.apple.com/app-store/">
              <Button className="hover:!bg-[#E0E0E0]">
                <FaApple size="28" />
                <div>
                  <span>{t('get_it_on')}</span>
                  <p>App Store</p>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.image}></div>
      </div>
      <div className={styles.app}>
        <div className={styles.learning}>
          <h3 className="dark:text-grey-600">{t('with_lynadlearn')}</h3>
          <p className="dark:text-grey-600">{t('with_lynadlearn')}</p>
          <div>
            {DAdvantages.map((item) => (
              <AdvantageItem key={item.title} {...item} />
            ))}
          </div>
        </div>
        <div className={styles.image}>
          <Image className={styles.back} src={pluses} alt="" />
          <div className={styles.rect} />
          <Image className={styles.front} src={gif} alt="" />
        </div>
      </div>
      <div className={styles.sections}>
        <h3 className="dark:text-grey-600">{t('main_sections')}</h3>
        <div className={styles.items}>
          <div className={styles.left}>
            {DSectionLeft.map((item) => (
              <SectionItem key={item.title} {...item} />
            ))}
          </div>
          <div className={styles.center}>
            <div>
              <div>
                <Image src={phone} alt="phone" />
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
      <div className={styles.features}>
        <div className={styles.slider}>
          <h3 className={`${styles['features-title']} dark:text-grey-600`}>{t('app_features')}</h3>
          <Features />
        </div>
        <Image src={message} alt="arrow" />
        <div className={styles['features-image']}>
          <div className={styles['light-blue']}></div>
          <div className={styles['dark-blue']}></div>
          <div className={styles.image}>
            <Image src={vocabulary} alt="vocabulary" />
          </div>
        </div>
      </div>
      <div className={`${styles.review} dark:bg-[#18223D]`}>
        <div>
          <h3 className="dark:text-grey-600">{t('reviews')}</h3>
          <UserReview />
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.items}>
          <h3 className="dark:text-grey-600">{t('faq')}</h3>
          <Accordion />
        </div>
        <Image src={faq} alt="faq"></Image>
      </div>
      <div className={styles.platform}>
        <div>
          <div className={styles.install}>
            <h3>{t('no_platform')}</h3>
            <p>{t('have_lynadlearn')}</p>
            <div className={styles.buttons}>
              <Link href="https://play.google.com/store/games/">
                <Button>
                  <FaGooglePlay size="24" />
                  <div>
                    <span>{t('get_it_on')}</span>
                    <p>Google Play</p>
                  </div>
                </Button>
              </Link>
              <Link href="https://www.apple.com/app-store/">
                <Button>
                  <FaApple size="28" />
                  <div>
                    <span>{t('get_it_on')}</span>
                    <p>App Store</p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          <Image src={installPc} className={styles.pc} alt="install" />
          <Image src={installMd} className={styles.tablet} alt="install" />
          <Image src={installSm} className={styles.mobile} alt="install" />
        </div>
      </div>
    </div>
  )
}
