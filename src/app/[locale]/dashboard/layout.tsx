import { ReactNode } from 'react'
import SideBar from '@/components/SideBar/SideBar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getSession } from '@/lib/auth'

import styles from './dashboardPage.module.scss'

interface IDashboard {
  children: ReactNode
}

async function Content({ children }: IDashboard) {
  const session = await getSession()

  return (
    <>
      <SideBar isAuth={session.isLoggedIn} />
      {children}
    </>
  )
}

export default function DashboardPage({ children }: IDashboard) {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <div className={styles['loader-wrapper']}>
            <Loader dimensionClass={styles.loader} />
          </div>
        }
      >
        <Content>{children}</Content>
      </Suspense>
    </div>
  )
}
