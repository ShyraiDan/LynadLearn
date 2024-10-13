'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
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

import { FaPlus } from 'react-icons/fa'

//TODO:
// fix error when user can authenticate on /dictionary/[id] page but they still saw toaster with no auth error
// add adding word to the list functionality
export const ListsModal = () => {
  const [open, setOpen] = useState(false)
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
    console.log('click')

    if (session && session.isLoggedIn) {
      console.log('auth')
      setOpen((state) => !state)
      removeScrollBar(open)
    } else {
      console.log('no auth')
      toast.error(t('need_auth'), {
        duration: 3000,
        className: 'border text-white-100 border-red bg-red'
      })
    }
  }

  const addWordToList = () => {
    console.log('click')
  }

  return (
    <>
      <Button className={styles.btn} onClick={() => showModal()}>
        <FaPlus size={20} />
      </Button>
      {open && (
        <Modal isOpen={open} handleClose={() => showModal()}>
          <div className={styles.modal}>
            <h3 className={styles.title}>{t('choose_list')}</h3>
            <div className={styles.list}>
              {lists.map((list) => (
                <div key={list._id} onClick={() => addWordToList()}>
                  <CustomList title={list.title} image={list.image} />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
      <SnackBar />
    </>
  )
}
