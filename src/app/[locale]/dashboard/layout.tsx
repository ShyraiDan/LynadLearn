import { ReactNode } from 'react'
import SideBar from '@/components/SideBar/SideBar'

import styles from './dashboardPage.module.scss'

interface IDashboard {
  children: ReactNode
}

export default function DashboardPage({ children }: IDashboard) {
  return (
    <main className={styles.container}>
      <SideBar />
      {children}
    </main>
  )
}
