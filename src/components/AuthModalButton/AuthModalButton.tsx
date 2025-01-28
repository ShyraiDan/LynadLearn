'use client'

import { useState, ReactNode } from 'react'
import Button from '@/components/ui/Button/Button'
import { removeScrollBar } from '@/constants/shared'
import { AuthModal } from '@/components/AuthModal/AuthModal'

interface IAuthModalProps {
  children?: ReactNode
  containerStyles?: string
  className?: string
  disabled?: boolean
}

export const AuthModalButton = ({ children, containerStyles, className, disabled }: IAuthModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const showModal = () => {
    setModalOpen((state) => !state)
    removeScrollBar(isModalOpen)
  }

  const handleChangeModal = () => {
    setModalOpen((state) => !state)
  }

  return (
    <>
      <div className={containerStyles}>
        <Button onClick={() => showModal()} className={className} disabled={disabled}>
          {children}
        </Button>
      </div>

      <AuthModal isModalOpen={isModalOpen} showModal={handleChangeModal} />
    </>
  )
}
