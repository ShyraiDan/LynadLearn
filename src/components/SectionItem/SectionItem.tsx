import styles from './Sectionitem.module.scss'
import Image from 'next/image'
import { ISections } from '@/interfaces/Sections.interface'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'

export const SectionItem = ({ title, icon, text }: ISections) => {
  const t = useTranslations('Mobile_app')

  return (
    <div
      className={twMerge(
        styles.item,
        'dark:bg-[#050E26] dark:shadow-[0_4px_16px_0_rgba(255,255,255,0.08)] dark:hover:shadow-[0_4px_16px_1px_rgba(255,255,255,0.15)]'
      )}>
      <div>
        <Image src={icon} alt={title} />
        <h3 className='dark:text-grey-600'>{t(title)}</h3>
      </div>
      <p className='dark:text-grey-600'>{t(text)}</p>
    </div>
  )
}
