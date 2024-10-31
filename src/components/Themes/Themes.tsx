'use client'

import styles from './Themes.module.scss'
import { Button } from '../ui/Button/Button'
import { useState, useEffect } from 'react'
import { changeTheme } from '@/lib/auth'

import { FaRegMoon, FaRegSun } from 'react-icons/fa'

export const Themes = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const handleChangeTheme = async (theme: 'light' | 'dark') => {
    await changeTheme(theme).then(() => setTheme(theme))
  }

  return (
    <div className={styles['theme-btn']}>
      <Button onClick={() => handleChangeTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'dark' ? <FaRegSun className={'dark:fill-[#fff]'} /> : <FaRegMoon className={'dark:fill-[#fff]'} />}
      </Button>
    </div>
  )
}
