import { Modal } from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

interface IRequireAuthModalProps {
  isOpen: boolean
  allowedAction: () => void
  handleClose: () => void
  children: ReactNode
}

export const RequireAuthModal = ({ isOpen, handleClose, allowedAction, children }: IRequireAuthModalProps) => {
  const t = useTranslations('general')
  return (
    <Modal
      isOpen={isOpen}
      className="sm:h-[200px] sm:w-[475px] sm:self-center sm:justify-self-center dark:!bg-[#0B152E]"
      handleClose={handleClose}
    >
      <div>
        {children}
        <div className="grid grid-cols-2 mt-6 gap-3 items-center">
          <Button className="!rounded" onClick={allowedAction}>
            {t('sign_in')}
          </Button>
          <Button
            outline
            className="!rounded dark:!border-white-100 dark:!text-white-100 dark:lg:hover:!border-purple-100 dark:lg:hover:!text-purple-100"
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
