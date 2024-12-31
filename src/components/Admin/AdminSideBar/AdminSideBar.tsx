'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { TbVocabulary, TbWriting } from 'react-icons/tb'
import { BsQuestionSquareFill } from 'react-icons/bs'

export default function AdminSideBar() {
  const path = usePathname()

  return (
    <div className='hidden px-4 py-6 h-full border-r border-grey-275 lg:flex lg:flex-col dark:border-[#1D2D4D]'>
      <ul className='flex flex-col fixed w-[222px]'>
        <li>
          <Link
            href='/admin/dashboard/vocabulary'
            className={twMerge(
              'flex w-full items-center text-blue-200 mb-1 py-2 px-3 rounded-lg font-bold transition-all ease-linear duration-150 hover:bg-blue-225 dark:text-grey-600',
              path === '/admin/dashboard/vocabulary' && 'bg-blue-225'
            )}>
            <TbVocabulary className='mr-2' />
            Vocabulary
          </Link>
        </li>
        <li>
          <Link
            href='/admin/dashboard/quiz'
            className={twMerge(
              'flex w-full items-center text-blue-200 mb-1 py-2 px-3 rounded-lg font-bold transition-all ease-linear duration-150 hover:bg-blue-225 dark:text-grey-600',
              path === '/admin/dashboard/quiz' && 'bg-blue-225'
            )}>
            <BsQuestionSquareFill className='mr-2' />
            Quiz
          </Link>
        </li>
        <li>
          <Link
            href='/admin/dashboard/grammar'
            className={twMerge(
              'flex w-full items-center text-blue-200 mb-1 py-2 px-3 rounded-lg font-bold transition-all ease-linear duration-150 hover:bg-blue-225 dark:text-grey-600',
              path === '/admin/dashboard/grammar' && 'bg-blue-225'
            )}>
            <TbWriting className='mr-2' />
            Grammar
          </Link>
        </li>
      </ul>
    </div>
  )
}
