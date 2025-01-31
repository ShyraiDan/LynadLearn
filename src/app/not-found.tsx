import Image from 'next/image'
import styles from './notFound.module.scss'
import Link from 'next/link'
import { H1, H6 } from '@/components/ui/Typography/Typography'

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
            <H1 className="mb-4 font-bold text-[2rem] dark:text-grey-600">Page not found</H1>
            <H6 className="mb-12 dark:text-grey-600">Sorry, the page you were looking for does not exist.</H6>
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
