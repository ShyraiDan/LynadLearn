'use client'

import styles from './Themes.module.scss'
import { Button } from '../ui/Button/Button'
import { useState, useEffect } from 'react'

import { FaRegMoon, FaRegSun } from 'react-icons/fa'

export const Themes = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light')
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <div className={styles['theme-btn']}>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'dark' ? <FaRegSun className={'dark:fill-[#fff]'} /> : <FaRegMoon className={'dark:fill-[#fff]'} />}
      </Button>
    </div>
  )
}
