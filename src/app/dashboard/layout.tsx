import { ReactNode } from 'react'

interface IDashboard {
  children: ReactNode
}

export default function DashboardPage({ children }: IDashboard) {
  return (
    <div>
      <h1>Dashboard</h1>
      {children}
    </div>
  )
}
