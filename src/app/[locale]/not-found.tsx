import Image from 'next/image'
import styles from '../notFound.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'
import { useTranslations } from 'next-intl'

import notFound from '@/assets/404.png'
import { FaHome } from 'react-icons/fa'

export default function NotFoundPage() {
  const t = useTranslations('404page')

  return (
    <div className={styles.container}>
      <div>
        <Image src={notFound} alt={t('page_not_found')} />
      </div>
      <div className={styles.message}>
        <h1 className='dark:text-grey-600'>{t('page_not_found')}</h1>
        <h4 className='dark:text-grey-600'>{t('sorry_the_page')}</h4>

        <NavigationLink href='/' className={styles.link}>
          <FaHome /> {t('back_home')}
        </NavigationLink>

        <span className='dark:text-grey-600'>
          {t('if_page_broken')} <NavigationLink href='/contact-us'>{t('let_us_know')}</NavigationLink> .
        </span>
      </div>
    </div>
  )
}
