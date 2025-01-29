import Image from 'next/image'
import styles from './notFound.module.scss'
import Link from 'next/link'

import notFound from '@/assets/404.png'
import { FaHome } from 'react-icons/fa'

export default function NotFoundPage() {
  return (
    <html lang="en">
      <body>
        <div className={styles['outside-container']}>
          <div>
            <Image src={notFound} alt="Page not found" />
          </div>
          <div className={styles.message}>
            <h1 className="dark:text-grey-600">Page not found</h1>
            <h4 className="dark:text-grey-600">Sorry, the page you were looking for does not exist.</h4>

            <Link href="/en" className={styles.link}>
              <FaHome /> Back Home
            </Link>

            <span className="dark:text-grey-600">
              If the page is broken <Link href="/en/contact-us">Let us know</Link> .
            </span>
          </div>
        </div>
      </body>
    </html>
  )
}
