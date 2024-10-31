import { useEffect, ReactNode } from 'react'
import { ReactPortal } from './ReactPortal/ReactPortal'
import styles from './Modal.module.scss'

import { RxCross1 } from 'react-icons/rx'

interface IModal {
  children: ReactNode
  isOpen: boolean
  handleClose: (e?: any) => void
  className?: string
}

export function Modal({ children, isOpen, handleClose, className }: IModal) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return (): void => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ReactPortal wrapperId='react-portal-modal-container'>
      <>
        <div className={styles.layout} />
        <div className={`${styles.modal} ${className}`}>
          <button onClick={(e) => handleClose(e)}>
            <RxCross1 size={'24px'} className='dark:text-grey-600' />
          </button>
          <div>{children}</div>
        </div>
      </>
    </ReactPortal>
  )
}
