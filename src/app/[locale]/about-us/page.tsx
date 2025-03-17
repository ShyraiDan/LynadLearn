import Image from 'next/image'
import styles from './AboutUsPage.module.scss'
import { useTranslations } from 'next-intl'
import { H6, H2, H1, P } from '@/components/ui/Typography/Typography'
import { ReactNode } from 'react'
import Container from '@/components/ui/Container/Container'

import image from '@/assets/about-us.png'
import { twMerge } from 'tailwind-merge'

type SectionTitleProps = {
  children: ReactNode
  className?: string
}

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <H2
      className={twMerge(
        'text-left text-blue-150 leading-8 mb-5 px-1 pt-6 text-3xl font-bold sm:text-[1.8rem] sm:text-left sm:px-0 md:text-[1.9rem] md:pt-0 md:mb-12 xl:text-[2rem] 2xl:text-[2.5rem]',
        className
      )}
    >
      {children}
    </H2>
  )
}

const SectionText = ({ children, className }: SectionTitleProps) => {
  return (
    <P
      className={twMerge(
        'mt-1 mb-4 text-blue-250 text-[1.2rem] leading-7 font-medium sm:text-[18px] dark:text-[#009CF3]',
        className
      )}
    >
      {children}
    </P>
  )
}

export default function AboutUsPage() {
  const t = useTranslations('About_us')

  return (
    <Container className={styles.container}>
      <section className={styles.top}>
        <H6 className="uppercase text-blue-400 text-sm mb-2 font-semibold text-center">{t('our_goal')}</H6>
        <H1 className="text-center text-blue-150 mb-2 px-1 pt-6 text-[1.5rem] font-extrabold sm:text-2xl sm:w-3/4 md:text-[1.9rem] md:px-8 xl:text-[2rem] 2xl:text-[2.5rem] dark:text-[#009CF3]">
          {t('improve_language_learning')}
        </H1>
        <P className="pt-2 px-2 text-justify leading-7 mt-1 mb-4 text-blue-250 text-[1.2rem] font-medium sm:text-lg sm:px-0 sm:pt-6 md:px-12 dark:text-[#009CF3]">
          {t('we_believe_modern_learning')}
        </P>
        <div>
          <Image src={image} alt="About LynadLearn" />
        </div>
      </section>
      <div className={styles.main}>
        <section>
          <SectionTitle>{t('how_can_AI_help')}</SectionTitle>
          <SectionText>{t('a_substantial_part_of_learning')}</SectionText>
          <SectionText>{t('with_the_help_of_AI')}</SectionText>
          <SectionText>{t('to_put_it_simply')}</SectionText>
        </section>
        <section>
          <SectionTitle>{t('why_is_learning_difficult')}</SectionTitle>
          <SectionText>{t('languages_are_these_huge_chunks')}</SectionText>
          <SectionText>{t('learn_new_language')}</SectionText>
          <SectionText>{t('always_fun_start')}</SectionText>
          <SectionText>{t('if_only_there')}</SectionText>
        </section>
      </div>
      <section className={styles.last}>
        <SectionTitle className="md:text-center">{t('who_are_we')}</SectionTitle>
        <SectionText>{t('we_are_team')}</SectionText>
      </section>
    </Container>
  )
}
