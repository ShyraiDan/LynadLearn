import { Modal } from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { ReactNode } from 'react'

interface IRequireAuthModalProps {
  isOpen: boolean
  allowedAction: () => void
  handleClose: () => void
  children: ReactNode
}

export const RequireAuthModal = ({ isOpen, handleClose, allowedAction, children }: IRequireAuthModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      className="sm:h-[200px] sm:w-[475px] sm:self-center sm:justify-self-center"
      handleClose={handleClose}
    >
      <div>
        {children}
        <div className="grid grid-cols-2 mt-6 gap-3 items-center">
          <Button className="!rounded" onClick={allowedAction}>
            Sign in
          </Button>
          <Button outline className="!rounded" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
