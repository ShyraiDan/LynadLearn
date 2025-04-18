'use client'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { Modal } from '../ui/Modal/Modal'
import Button from '../ui/Button/Button'
import { useTranslations } from 'next-intl'
import { H3, H4, P } from '../ui/Typography/Typography'

interface ScoredInfoModalProps {
  rating: number
}

export default function ScoredInfoModal({ rating }: ScoredInfoModalProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const t = useTranslations('dashboard.profile')

  const showModal = () => {
    setModalOpen((state) => !state)
    removeScrollBar(isModalOpen)
  }

  return (
    <>
      <Button
        className="!rounded !mt-2 !p-2 bg-blue-225 shadow-md text-blue-200 font-bold w-fit dark:text-grey-600 dark:bg-[#1D2D4D]"
        onClick={() => showModal()}
      >
        {t('rate')}: {rating}
      </Button>

      <Modal isOpen={isModalOpen} className="dark:bg-[#0B152E]" handleClose={() => showModal()} successModal>
        <div>
          <H3>{t('points.rulesTitle')}</H3>

          <H4>{t('points.quiz.title')}</H4>

          <ul className="ml-4 mb-4 marker:text-white-100 !list-disc">
            <li>
              <P>{t('points.quiz.rules_completing')}</P>
            </li>
            <li>
              <P>{t('points.quiz.rules_answer')}</P>
            </li>
            <li>
              <P>{t('points.quiz.rules_additionally')}</P>
            </li>
          </ul>

          <H4>{t('points.flashcards.title')}</H4>

          <ul className="ml-4 mb-4 marker:text-white-100 !list-disc">
            <li>
              <P>{t('points.flashcards.rules_completing')}</P>
            </li>
            <li>
              <P>{t('points.flashcards.rules_additionally')}</P>
            </li>
          </ul>

          <H4>{t('points.wordlist.title')}</H4>

          <ul className="ml-4 mb-4 marker:text-white-100 !list-disc">
            <li>
              <P>{t('points.wordlist.rules_word')}</P>
            </li>
            <li>
              <P>{t('points.wordlist.rules_list')}</P>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  )
}
