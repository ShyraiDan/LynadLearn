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
import { H1, P, H3 } from '@/components/ui/Typography/Typography'

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
          <H1 className="text-lg mt-1 pb-4 text-black font-semibold mb-0 xs:text-2xl md:pb-0 lg:text-[40px] dark:text-grey-600">
            {t('download')}{' '}
            <span className="text-blue-100">
              Lynad<span className="text-purple-100">Learn </span>
            </span>
            {t('mobile_app')}
          </H1>
          <Image src={line} alt="line" />
          <P className="!text-[1rem] dark:text-grey-600">{t('always_download')}</P>
          <div>
            <Link href="https://play.google.com/store/games/">
              <Button className="lg:hover:!bg-[#E0E0E0]">
                <FaGooglePlay size="24" />
                <div>
                  <span>{t('get_it_on')}</span>
                  <P className="mt-[-5px] text-black dark:!text-black">Google Play</P>
                </div>
              </Button>
            </Link>
            <Link href="https://www.apple.com/app-store/">
              <Button className="lg:hover:!bg-[#E0E0E0]">
                <FaApple size="28" />
                <div>
                  <span>{t('get_it_on')}</span>
                  <P className="mt-[-5px] text-black dark:!text-black">App Store</P>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.image}></div>
      </div>
      <div className={styles.app}>
        <div className={styles.learning}>
          <H3 className="font-bold text-base sm:text-lg md:text-2xl !mb-0 dark:text-grey-600">
            {t('with_lynadlearn')}
          </H3>
          <P className="text-sm dark:text-grey-600">{t('with_lynadlearn')}</P>
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
        <H3 className="font-bold text-2xl mb-8 dark:text-grey-600">{t('main_sections')}</H3>
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
          <H3 className="text-black text-base font-bold mb-0 sm:text-lg lg:text-2xl dark:text-grey-600">
            {t('app_features')}
          </H3>
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
          <H3 className="text-center text-2xl font-bold mb-4 dark:text-grey-600">{t('reviews')}</H3>
          <UserReview />
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.items}>
          <H3 className="text-left text-2xl font-bold mb-4 dark:text-grey-600">{t('faq')}</H3>
          <Accordion />
        </div>
        <Image src={faq} alt="faq"></Image>
      </div>
      <div className={styles.platform}>
        <div>
          <div className={styles.install}>
            <H3 className="font-bold mb-2 sm:text-lg dark:text-white-100">{t('no_platform')}</H3>
            <P className="text-sm font-medium mb-4 dark:text-white-100">{t('have_lynadlearn')}</P>
            <div className={styles.buttons}>
              <Link href="https://play.google.com/store/games/">
                <Button>
                  <FaGooglePlay size="24" />
                  <div>
                    <span>{t('get_it_on')}</span>
                    <P className="mt-[-5px] text-black dark:!text-black">Google Play</P>
                  </div>
                </Button>
              </Link>
              <Link href="https://www.apple.com/app-store/">
                <Button>
                  <FaApple size="28" />
                  <div>
                    <span>{t('get_it_on')}</span>
                    <P className="mt-[-5px] text-black dark:!text-black">App Store</P>
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
