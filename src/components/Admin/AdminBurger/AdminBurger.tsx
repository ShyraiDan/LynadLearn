'use client'

import Link from 'next/link'
import { useState } from 'react'
import { removeScrollBar } from '@/constants/shared'
import { logout } from '@/lib/auth'
import Button from '@/components/ui/Button/Button'
import { usePathname } from 'next/navigation'

import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

export default function AdminBurger() {
  const [isBurgerShow, setBurgerShow] = useState(false)
  const pathname = usePathname()

  const showModal = () => {
    setBurgerShow((state) => !state)
    removeScrollBar(isBurgerShow)
  }

  return (
    <>
      <div onClick={() => showModal()} className='ml-3 w-[30px] h-[20px] relative z-[1] cursor-pointer lg:hidden'>
        <span className='absolute left-0 h-[2px] w-full top-[9px] bg-blue-200 first:top-0 last:top-[18px] dark:bg-grey-600'></span>
        <span className='absolute left-0 h-[2px] w-full top-[9px] bg-blue-200 first:top-0 last:top-[18px] dark:bg-grey-600'></span>
        <span className='absolute left-0 h-[2px] w-full top-[9px] bg-blue-200 first:top-0 last:top-[18px] dark:bg-grey-600'></span>
      </div>
      <div className={`${isBurgerShow && 'fixed top-0 left-0 w-full h-screen z-10 bg-neutral-800 opacity-50'} `} />
      <div
        className={`bg-slate-300 fixed top-0 left-[-100%] h-[100vh] w-[290px] px-2.5 z-[20] flex justify-between flex-col transition-all ease-in-out duration-300 lg:hidden dark:bg-blue-600 ${
          isBurgerShow && 'py-2.5 px-5 left-[0px]'
        } `}>
        <div>
          <div className='py-4 flex justify-between items-center border-b border-[#0000001a]'>
            <h2 className='font-bold text-2xl text-blue-300'>
              Lynad<span className='text-purple-100'>Learn</span>
            </h2>
            <RxCross1 className='cursor-pointer dark:text-grey-600' onClick={() => showModal()} size='24px' />
          </div>
          <ul className='py-4'>
            <li className='flex items-center justify-between leading-5 my-1'>
              <Link
                className={twMerge(
                  'font-medium my-1 capitalize dark:text-grey-600 transition-all ease-in-out duration-150 hover:text-purple-100',
                  pathname === '/admin/dashboard/vocabulary' && 'text-purple-100'
                )}
                onClick={() => showModal()}
                href='/admin/dashboard/vocabulary'>
                Vocabulary
              </Link>
            </li>
            <li className='flex items-center justify-between leading-5 my-1'>
              <Link
                className={twMerge(
                  'font-medium my-1 capitalize dark:text-grey-600 transition-all ease-in-out duration-150 hover:text-purple-100',
                  pathname === '/admin/dashboard/quiz' && 'text-purple-100'
                )}
                onClick={() => showModal()}
                href='/admin/dashboard/quiz'>
                Quiz
              </Link>
            </li>
            <li className='flex items-center justify-between leading-5 my-1'>
              <Link
                className={twMerge(
                  'font-medium my-1 capitalize dark:text-grey-600 transition-all ease-in-out duration-150 hover:text-purple-100',
                  pathname === '/admin/dashboard/grammar' && 'text-purple-100'
                )}
                onClick={() => showModal()}
                href='/admin/dashboard/grammar'>
                Grammar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className='flex flex-col pb-4'>
            <Button className='!bg-red' onClick={() => logout()}>
              Log out
            </Button>
          </div>
          <div className='flex justify-center border-t border-[#0000001a] pt-4'>
            <ul className='flex gap-3 items-center ml-2'>
              <li>
                <Link
                  className='transition-all ease-in-out duration-150 hover:text-purple-100'
                  href='https://www.instagram.com/'>
                  <FaInstagram className='dark:text-grey-600' />
                </Link>
              </li>
              <li>
                <Link href='https://twitter.com/'>
                  <FaXTwitter className='dark:text-grey-600 ' />
                </Link>
              </li>
              <li>
                <Link href='https://www.facebook.com/'>
                  <FaFacebook className='dark:text-grey-600' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
