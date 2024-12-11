'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { TbWriting } from 'react-icons/tb'

export default function AdminSideBar({ isAuth }: { isAuth: boolean }) {
  const path = usePathname()

  const page = path.split('/')[3]

  return (
    <div className='hidden px-4 py-6 h-full border-r border-grey-275 lg:flex lg:flex-col dark:border-[#1D2D4D]'>
      <ul className='flex flex-col fixed w-[222px]'>
        <li>
          <Link
            href={'/admin/dashboard/grammar'}
            className={`flex w-full items-center text-blue-200 mb-1 py-2 px-3 rounded-lg font-bold transition-all ease-linear duration-150
        hover:bg-blue-225 ${page === 'grammar' && 'bg-blue-225'}`}>
            <TbWriting className='mr-2' />
            Grammar
          </Link>
        </li>
      </ul>
    </div>
  )
}
