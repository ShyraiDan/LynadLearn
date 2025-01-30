'use client'

import styles from './Themes.module.scss'
import Button from '../ui/Button/Button'
import { useState, useEffect } from 'react'
// import { changeTheme } from '@/lib/auth'

import { FaRegMoon, FaRegSun } from 'react-icons/fa'

export const Themes = () => {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme) {
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      setTheme(storedTheme)
    }
  }, [])

  const handleChangeTheme = async (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    setTheme(theme)
  }

  return (
    <div className={styles['theme-btn']}>
      <Button
        className="dark:hover:bg-[#1D2D4D]"
        onClick={() => handleChangeTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'dark' ? <FaRegSun className="dark:fill-[#fff]" /> : <FaRegMoon className="dark:fill-[#fff]" />}
      </Button>
    </div>
  )
}
