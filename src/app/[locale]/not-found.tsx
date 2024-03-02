import Image from 'next/image'
import styles from './notFound.module.scss'
import NavigationLink from '@/components/ui/NavigationLink/NavigationLink'

import notFound from '@/assets/404.png'
import { FaHome } from 'react-icons/fa'

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image src={notFound} alt='Page not found' />
      </div>
      <div className={styles.message}>
        <h1>Page not found</h1>
        <h4>Sorry, the page you were looking for does not exist.</h4>

        <NavigationLink href='/' className={styles.link}>
          <FaHome /> Back Home
        </NavigationLink>

        <span>
          If the page is broken, <NavigationLink href='/contact-us'>Let us know</NavigationLink>.
        </span>
      </div>
    </div>
  )
}
