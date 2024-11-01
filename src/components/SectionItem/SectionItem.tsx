import styles from './Sectionitem.module.scss'
import Image from 'next/image'
import { ISections } from '@/interfaces/Sections.interface'
import { useTranslations } from 'next-intl'

export const SectionItem = ({ title, icon, text }: ISections) => {
  const t = useTranslations('Mobile_app')

  return (
    <div className={`${styles.item} dark:bg-[#050E26]`}>
      <div>
        <Image src={icon} alt={title} />
        <h3 className='dark:text-grey-600'>{t(title)}</h3>
      </div>
      <p className='dark:text-grey-600'>{t(text)}</p>
    </div>
  )
}
