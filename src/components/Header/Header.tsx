import Link from 'next/link'
import styles from './Header.module.scss'
import { Button } from '../ui/Button/Button'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div></div>
        <Link href={'/'}>LynadLearn</Link>
        <nav>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-item']}>
              <Link href={'/about-us'}>About us</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href={'/pricing'}>Pricing</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href={'/corporate'}>Corporate</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href={'/dashboard/lists'}>Dashboard</Link>
            </li>
            <li className={styles['nav-item']}>English</li>
          </ul>
        </nav>
      </div>
      <div className={styles['header-right']}>
        <Button>Login</Button>
      </div>
    </header>
  )
}
