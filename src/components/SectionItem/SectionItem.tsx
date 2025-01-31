import styles from './SectionItem.module.scss'
import Image from 'next/image'
import { ISections } from '@/interfaces/Sections.interface'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { H3, P } from '@/components/ui/Typography/Typography'

export const SectionItem = ({ title, icon, text }: ISections) => {
  const t = useTranslations('Mobile_app')

  return (
    <div
      className={twMerge(
        styles.item,
        'dark:bg-[#050E26] dark:shadow-[0_4px_16px_0_rgba(255,255,255,0.08)] dark:hover:shadow-[0_4px_16px_1px_rgba(255,255,255,0.15)]'
      )}
    >
      <div>
        <Image src={icon} alt={title} />
        <H3 className="font-semibold text-sm mb-0 ml-2 sm:text-lg">{t(title)}</H3>
      </div>
      <P className="text-xs mt-4 mb-0 sm:text-sm">{t(text)}</P>
    </div>
  )
}
