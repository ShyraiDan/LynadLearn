'use client'

import styles from './ContactUsPage.module.scss'
import Button from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IContactUS } from '@/interfaces/ContactUs.interface'
import { sendContacts } from '@/lib/contact'
import SnackBar from '@/components/ui/SnackBar/SnackBar'
import { toast } from 'sonner'

export default function ContactUsPage() {
  const t = useTranslations()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IContactUS>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<IContactUS> = async (values) => {
    await sendContacts(values)
    toast.success(t('Contact_Us.form_submitted'), { duration: 3000 })

    reset()
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={`${styles.title} dark:text-grey-600`}>{t('Contact_Us.contact_us')}</h1>
          <p className={`${styles.subtitle} dark:text-grey-600`}>{t('Contact_Us.we_take_our_commitment')}</p>
          <p className={`${styles.subtitle} dark:text-grey-600`}>{t('Contact_Us.we_are_also_proud')}</p>
        </div>
        <div className={styles.form}>
          <div className={`${styles['form-container']} dark:bg-[#1C213F]`}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder={t('Forms.enter_your_name')}
                  obj={register('userName', {
                    required: { value: true, message: t('Forms.name_required') }
                  })}
                >
                  {t('Forms.user_name')}
                </Input>
                {errors?.userName && <p className={styles.error}>{errors.userName.message}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('Forms.enter_your_email')}
                  obj={register('email', {
                    required: { value: true, message: t('Forms.email_required') },
                    pattern: { value: /^\S+@\S+$/i, message: t('Forms.email_invalid') }
                  })}
                >
                  {t('Forms.email')}
                </Input>
                {errors?.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder={t('Forms.enter_subject')}
                  obj={register('subject', {
                    required: { value: true, message: t('Forms.subject_required') },
                    minLength: { value: 10, message: t('Forms.subject_minLength') }
                  })}
                >
                  {t('Forms.subject')}
                </Input>
                {errors?.subject && <p className={styles.error}>{errors.subject.message}</p>}
              </div>
              <div>
                <label className="dark:text-grey-600" htmlFor="message">
                  {t('Forms.message')}
                </label>
                <textarea
                  className="dark:bg-[#17294c] dark:ml-[1px] dark:border-[#ffffff20] dark:text-grey-600"
                  id="message"
                  placeholder={t('Forms.enter_message')}
                  {...register('message', {
                    required: { value: true, message: t('Forms.message_required') },
                    minLength: { value: 20, message: t('Forms.message_minLength') }
                  })}
                />
                {errors?.message && <p className={styles.error}>{errors.message.message}</p>}
              </div>
              <Button type="submit">{t('Forms.submit')}</Button>
            </form>
          </div>
        </div>
      </div>
      <SnackBar styleClass={styles.correct} />
    </>
  )
}
