import styles from './PageHeading.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { H1, P } from '@/components/ui/Typography/Typography'

import { FaBookOpen, FaClock } from 'react-icons/fa6'
import { MdPlayLesson } from 'react-icons/md'
import verbs from '@/assets/500_verbs.png'

interface IPageHeading {
  name: string
  id: string
  title: string
  description: string
  showStatistics?: boolean
}

export default function PageHeading({ name, id, title, description, showStatistics }: IPageHeading) {
  const t = useTranslations('dashboard')
  const lessons = 20
  const words = 500

  const links = [
    { link: '/', title: 'Home' },
    { link: '/lists', title: 'Lists' },
    { link: `/lists/${name}`, title: name }
  ]

  return (
    <div className={styles.heading}>
      <div className={styles['heading-left']}>
        <H1 className="text-center my-0 text-lg font-bold mb-4 sm:text-2xl lg:text-4xl">{title}</H1>
        <P className="text-sm self-start mb-4 sm:text-base">{description}</P>
        <div className={styles.breadcrumbs}>
          <nav>
            <ul>
              {links.map((item) => {
                return (
                  <>
                    <li key={item.title}>
                      <NavigationLink href={item.link}>{item.title}</NavigationLink>
                    </li>
                  </>
                )
              })}
              <li>
                <span>{id}</span>
              </li>
            </ul>
          </nav>
        </div>
        {showStatistics && (
          <div className={styles.stats}>
            <div>
              <FaBookOpen />
              <P className="m-0 text-xs sm:text-sm">
                <span>{lessons}</span> {t('lists.learn.lessons')}
              </P>
            </div>
            <div>
              <MdPlayLesson />
              <P className="m-0 text-xs sm:text-sm">
                <span>{words}</span> {t('lists.learn.words')}
              </P>
            </div>
            <div>
              <FaClock />
              <P className="m-0 text-xs sm:text-sm">
                <span>
                  {Math.floor(words / 120) > 1 && (
                    <>
                      {Math.floor(words / 120)} {t('lists.learn.hours')}{' '}
                    </>
                  )}
                  {Math.ceil((words % 60) / 2)} {t('lists.learn.minutes')}
                </span>
              </P>
            </div>
          </div>
        )}
      </div>
      <div className={styles['heading-right']}>
        {/* Todo: Fill alt attribute */}
        <Image src={verbs} alt="" />
      </div>
    </div>
  )
}
