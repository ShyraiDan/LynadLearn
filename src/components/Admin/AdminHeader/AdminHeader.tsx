import Link from 'next/link'
import { Themes } from '@/components/Themes/Themes'
import AdminBurger from '@/components/Admin/AdminBurger/AdminBurger'

export async function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur bg-white-100 bg-opacity-80 dark:bg-blue-600 dark:border-[#1D2D4D]">
      <div className="flex items-center p-4 justify-between lg:mx-auto border-b border-grey-275 lg:max-w-[100%] dark:border-none">
        <div className="flex items-center">
          <Link className="text-blue-300 sm:text-2xl font-bold p-2" href="/admin/dashboard">
            Lynad<span className="text-purple-100">Learn</span>
          </Link>
        </div>
        <div className="flex items-center">
          <Themes />
          <AdminBurger />
        </div>
      </div>
    </header>
  )
}
