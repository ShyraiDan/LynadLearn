import styles from './ContactUsPage.module.scss'
import { Button } from '@/components/ui/Button/Button'

export default function ContactUsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Contact Us</h1>
        <p>
          We take our commitment to our users seriously. If you need our help with your user account, have questions
          about how to use the platform or are experiencing technical difficulties, please do not hesitate to contact
          us.
        </p>
        <p>We are also proud to work with other similar corporations and investors.</p>
      </div>
      <div className={styles.form}>
        <div>
          <form action=''>
            <div>
              <label htmlFor='fullName'>Full Name</label>
              <input type='text' name='fullName' id='fullName' placeholder='Enter your full name' />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' id='email' placeholder='Enter your email' />
            </div>
            <div>
              <label htmlFor='subject'>Subject</label>
              <input type='text' name='subject' id='subject' placeholder='Enter subject' />
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <textarea name='message' id='message' placeholder='Enter your message' />
            </div>

            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
