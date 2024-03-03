import styles from './ContactUsPage.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'

export default function ContactUsPage() {
  const t = useTranslations()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>{t('Contact_Us.contact_us')}</h1>
        <p>{t('Contact_Us.we_take_our_commitment')}</p>
        <p>{t('Contact_Us.we_are_also_proud')}</p>
      </div>
      <div className={styles.form}>
        <div>
          <form action=''>
            <div>
              <Input required type='text' name='fullName' id='fullName' placeholder={t('Forms.enter_your_name')}>
                {t('Forms.user_name')}
              </Input>
            </div>
            <div>
              <Input required type='email' name='email' id='email' placeholder={t('Forms.enter_your_email')}>
                {t('Forms.email')}
              </Input>
            </div>
            <div>
              <Input required type='text' name='subject' id='subject' placeholder={t('Forms.enter_subject')}>
                {t('Forms.subject')}
              </Input>
            </div>
            <div>
              <label htmlFor='message'>{t('Forms.message')}</label>
              <textarea required name='message' id='message' placeholder={t('Forms.enter_message')} />
            </div>
            <Button type='submit'>{t('Forms.submit')}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
