import { ReactNode } from 'react'

interface IDashboard {
  children: ReactNode
}

export default function DashboardPage({ children }: IDashboard) {
  return (
    <main>
      <h1>Dashboard</h1>
      {children}
    </main>
  )
}
