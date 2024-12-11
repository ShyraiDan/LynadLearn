import { ReactNode } from 'react'
import AdminSideBar from '@/components/Admin/AdminSideBar/AdminSideBar'
import { Suspense } from 'react'
import Loader from '@/components/Loader/Loader'
import { getSession } from '@/lib/auth'
import { AdminHeader } from '@/components/Admin/AdminHeader/AdminHeader'

interface IDashboard {
  children: ReactNode
}

async function Content({ children }: IDashboard) {
  const session = await getSession()

  return (
    <>
      <AdminSideBar isAuth={session.isLoggedIn} />
      {children}
    </>
  )
}

export default function AdminDashboardLayout({ children }: IDashboard) {
  return (
    <>
      <AdminHeader />
      <div className='lg:grid lg:grid-cols-[255px_calc(100%-255px)] max-w-[100vw]'>
        <Suspense
          fallback={
            <div className='w-[100vw] min-h-[calc(100vh-397px-81px)] sm:min-h-[calc(100vh-193px-81px)] md:min-h-[calc(100vh-153px-81px)] lg:min-h-[calc(100vh-97px-81px)];'>
              <Loader dimensionClass='h-[calc(100vh-397px-81px)] sm:h-[calc(100vh-193px-81px)] md:h-[calc(100vh-153px-81px)] lg:h-[calc(100vh-97px-81px)];' />
            </div>
          }>
          <Content>{children}</Content>
        </Suspense>
      </div>
    </>
  )
}
