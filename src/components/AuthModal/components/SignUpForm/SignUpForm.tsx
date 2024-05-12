'use client'

import styles from './SignUpForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ISignUp } from '../Auth.interface'

export default function SignUpForm() {
  const t = useTranslations('Forms')

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<ISignUp>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<ISignUp> = async (values) => {
    console.log(values)
  }

  return (
    <form action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        name='email'
        id='email'
        placeholder={t('enter_your_email')}
        obj={register('email', {
          required: { value: true, message: t('email_required') },
          pattern: { value: /^\S+@\S+$/i, message: t('email_invalid') }
        })}>
        {t('email')}
      </Input>
      {errors?.email && <p className={styles.error}>{errors.email.message}</p>}
      <Input
        type='text'
        name='userName'
        id='userName'
        placeholder={t('enter_your_name')}
        obj={register('userName', {
          required: { value: true, message: t('name_required') },
          minLength: { value: 3, message: t('name_minLength') },
          maxLength: { value: 20, message: t('name_maxLength') }
        })}>
        {t('user_name')}
      </Input>
      {errors?.userName && <p className={styles.error}>{errors.userName.message}</p>}
      <Input
        type='password'
        name='password'
        id='password'
        placeholder={t('enter_password')}
        obj={register('password', {
          required: { value: true, message: t('password_required') },
          minLength: { value: 8, message: t('password_minLength') },
          maxLength: { value: 20, message: t('password_maxLength') }
        })}>
        {t('password')}
      </Input>
      {errors?.password && <p className={styles.error}>{errors.password.message}</p>}
      <Input
        type='password'
        name='confirmPassword'
        id='confirmPassword'
        placeholder={t('confirm_your_password')}
        obj={register('confirmPassword', {
          required: { value: true, message: t('confirm_password_required') },
          validate: (value) => value === watch('password') || t('confirm_password_mismatch')
        })}>
        {t('confirm_password')}
      </Input>
      {errors?.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      <Button type='submit'>{t('sign_up')}</Button>
    </form>
  )
}
