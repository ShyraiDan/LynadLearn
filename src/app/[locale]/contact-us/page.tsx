'use client'

import styles from './ContactUsPage.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IContactUS } from '@/interfaces/ContactUs.interface'

export default function ContactUsPage() {
  const t = useTranslations()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<IContactUS>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IContactUS> = async (values) => {
    console.log(values)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>{t('Contact_Us.contact_us')}</h1>
        <p>{t('Contact_Us.we_take_our_commitment')}</p>
        <p>{t('Contact_Us.we_are_also_proud')}</p>
      </div>
      <div className={styles.form}>
        <div>
          <form action='' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type='text'
                name='userName'
                id='userName'
                placeholder={t('Forms.enter_your_name')}
                obj={register('userName', {
                  required: { value: true, message: 'User name is required field' }
                })}>
                {t('Forms.user_name')}
              </Input>
              {errors?.userName && <p className={styles.error}>{errors.userName.message}</p>}
            </div>
            <div>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder={t('Forms.enter_your_email')}
                obj={register('email', {
                  required: { value: true, message: 'Email is required field' },
                  pattern: { value: /^\S+@\S+$/i, message: 'Email is not valid' }
                })}>
                {t('Forms.email')}
              </Input>
              {errors?.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div>
              <Input
                type='text'
                name='subject'
                id='subject'
                placeholder={t('Forms.enter_subject')}
                obj={register('subject', {
                  required: { value: true, message: 'Subject is required field' },
                  minLength: { value: 10, message: 'Subject must be at least 10 characters' }
                })}>
                {t('Forms.subject')}
              </Input>
              {errors?.subject && <p className={styles.error}>{errors.subject.message}</p>}
            </div>
            <div>
              <label htmlFor='message'>{t('Forms.message')}</label>
              <textarea
                id='message'
                placeholder={t('Forms.enter_message')}
                {...register('message', {
                  required: { value: true, message: 'Message is required field' },
                  minLength: { value: 20, message: 'Message must be at least 20 characters' }
                })}
              />
              {errors?.message && <p className={styles.error}>{errors.message.message}</p>}
            </div>
            <Button type='submit'>{t('Forms.submit')}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
