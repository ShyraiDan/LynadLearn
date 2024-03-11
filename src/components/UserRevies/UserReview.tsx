import Image from 'next/image'
import styles from './UserReview.module.scss'
import { DReview } from '@/mock/Review.mock'

import { IoStarSharp } from 'react-icons/io5'
import { FaGooglePlay, FaQuoteRight } from 'react-icons/fa6'

export default function UserReview() {
  return (
    <>
      {DReview.map((review) => {
        return (
          <div key={review.id} className={styles.container}>
            <FaQuoteRight size={'36px'} fill='#B8B8B8' />
            <div className={styles.user}>
              <Image src={review.avatar} alt='user-icon'></Image>
              <p>{review.name}</p>
            </div>
            <p>{review.text}</p>
            <div className={styles.mark}>
              <div className={styles.stars}>
                <IoStarSharp size={'20px'} fill='#FFA944' />
                <IoStarSharp size={'20px'} fill='#FFA944' />
                <IoStarSharp size={'20px'} fill='#FFA944' />
                <IoStarSharp size={'20px'} fill='#FFA944' />
                <IoStarSharp size={'20px'} fill='#FFA944' />
              </div>
              <div className={styles.platform}>
                <FaGooglePlay />
                <p>Google Play</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
