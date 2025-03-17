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
import { H1, P } from '@/components/ui/Typography/Typography'
import Container from '@/components/ui/Container/Container'

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
      <Container className={styles.container}>
        <div className={styles.left}>
          <H1 className="text-3xl text-blue-200 px-6 font-bold mb-4 dark:text-grey-600">
            {t('Contact_Us.contact_us')}
          </H1>
          <P className="px-6 mb-2 pt-2 text-justify text-blue-125 text-base font-medium dark:text-grey-600">
            {t('Contact_Us.we_take_our_commitment')}
          </P>
          <P className="px-6 mb-2 pt-2 text-justify text-blue-125 text-base font-medium dark:text-grey-600">
            {t('Contact_Us.we_are_also_proud')}
          </P>
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
                {errors?.userName && (
                  <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.userName.message}</P>
                )}
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
                {errors?.email && (
                  <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.email.message}</P>
                )}
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
                {errors?.subject && (
                  <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.subject.message}</P>
                )}
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
                {errors?.message && (
                  <P className="text-[1rem] text-red mt-1.5 text-sm dark:!text-red">{errors.message.message}</P>
                )}
              </div>
              <Button type="submit">{t('Forms.submit')}</Button>
            </form>
          </div>
        </div>
      </Container>
      <SnackBar styleClass={styles.correct} />
    </>
  )
}
