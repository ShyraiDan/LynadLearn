import styles from './PageHeading.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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
        <h1 className='dark:text-grey-600'>{title}</h1>
        <p className='dark:text-grey-600'>{description}</p>
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
              <p>
                <span>{lessons}</span> {t('lists.learn.lessons')}
              </p>
            </div>
            <div>
              <MdPlayLesson />
              <p>
                <span>{words}</span> {t('lists.learn.words')}
              </p>
            </div>
            <div>
              <FaClock />
              <p>
                <span>
                  {Math.floor(words / 120) > 1 && (
                    <>
                      {Math.floor(words / 120)} {t('lists.learn.hours')}{' '}
                    </>
                  )}
                  {Math.ceil((words % 60) / 2)} {t('lists.learn.minutes')}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles['heading-right']}>
        <Image src={verbs} alt='' />
      </div>
    </div>
  )
}
