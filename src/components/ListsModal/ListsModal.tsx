'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button/Button'
import styles from './ListsModal.module.scss'
import { getYourLists } from '@/lib/lists'
import { Modal } from '@/components/ui/Modal/Modal'
import { removeScrollBar } from '@/constants/shared'
import { IList } from '@/interfaces/List.interface'
import CustomList from '@/components/CustomList/CustomList'
import { getSession } from '@/lib/auth'
import { ISession } from '@/lib/auth'
import { toast } from 'sonner'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import { IWord } from '@/interfaces/Word.interface'
import { createWord } from '@/lib/word'

import { FaPlus } from 'react-icons/fa'
import { RequireAuthModal } from '../RequireAuthModal/RequireAuthModal'
import { AuthModal } from '../AuthModal/AuthModal'

//TODO:
// fix error when user can authenticate on /dictionary/[id] page but they still saw toaster with no auth error

export const ListsModal = ({ word }: { word: IWord }) => {
  const [open, setOpen] = useState(false)
  const [isAuthRequireModal, setAuthRequireModal] = useState(false)
  const [isAuthModal, setAuthModal] = useState(false)
  const [lists, setLists] = useState<IList[]>([])
  const [session, setSession] = useState<ISession>()
  const t = useTranslations('Dictionary.modal')

  useEffect(() => {
    getSession().then((data) => {
      setSession(data)
    })

    getYourLists().then((lists) => {
      setLists(lists)
    })
  }, [])

  const showModal = () => {
    if (session?.isLoggedIn) {
      setOpen((state) => !state)
      removeScrollBar(open)
    } else {
      // console.log('no auth')
      // toast.error(t('need_auth'), {
      //   duration: 3000,
      //   className: 'border text-white-100 border-red bg-red'
      // })

      setAuthRequireModal(true)
      removeScrollBar(isAuthRequireModal)
    }
  }

  const handleClose = () => {
    setAuthRequireModal(false)
    removeScrollBar(isAuthRequireModal)
  }

  const addWordToList = async (listId: string) => {
    await createWord({ ...word, listId: listId }).then((res) => {
      if (res.success) {
        toast.success(t('successfully_added'), {
          duration: 3000,
          className: 'border text-white-100 border-green-100 bg-green-100'
        })
      } else {
        toast.success(t('error_added'), {
          duration: 3000,
          className: 'border text-white-100 border-red bg-red'
        })
      }
    })
  }

  return (
    <>
      <Button
        className={twMerge(
          styles.btn,
          '!w-[44px] !h-[44px] !p-3 !rounded-2xl dark:!bg-[#1D2D4D] dark:text-grey-600 dark:hover:!bg-purple-100'
        )}
        onClick={() => showModal()}>
        <FaPlus size={20} />
      </Button>
      <Modal isOpen={open} className='dark:bg-[#0B152E]' handleClose={() => showModal()}>
        <div className={styles.modal}>
          <h3 className={twMerge(styles.title, 'dark:text-grey-600')}>{t('choose_list')}</h3>
          <div className={styles.list}>
            {lists.map((list) => (
              <div key={list._id} onClick={() => addWordToList(list._id)}>
                <CustomList title={list.title} image={list.image} />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <RequireAuthModal
        isOpen={isAuthRequireModal}
        handleClose={handleClose}
        allowedAction={() => {
          setAuthModal(true)
          handleClose()
        }}>
        <p className='text-center font-bold'>In order to add to your bookmarks you must sign in to your account</p>
      </RequireAuthModal>

      <AuthModal isModalOpen={isAuthModal} showModal={() => setAuthModal((state) => !state)} />

      <SnackBar />
    </>
  )
}
