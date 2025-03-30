import styles from './PageHeading.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { H1, P } from '@/components/ui/Typography/Typography'
import { twMerge } from 'tailwind-merge'

import { FaBookOpen, FaClock } from 'react-icons/fa6'
import { MdPlayLesson } from 'react-icons/md'

interface IPageHeading {
  title: string
  description: string
  showStatistics?: boolean
  image?: string
}

export default function PageHeading({ title, description, showStatistics, image }: IPageHeading) {
  const t = useTranslations('dashboard')
  const lessons = 20
  const words = 500

  return (
    <div className={twMerge(styles.heading, !image && 'mt-12')}>
      <div className={styles['heading-left']}>
        <H1 className="text-center my-0 text-lg font-bold mb-4 sm:text-2xl lg:text-4xl">{title}</H1>
        <P className="text-sm self-start mb-4 sm:text-base">{description}</P>
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
        {image && (
          <Image
            src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/core/collections/${image}`}
            alt={title}
            unoptimized
            width={110}
            height={165}
          />
        )}
      </div>
    </div>
  )
}
