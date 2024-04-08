'use client'

import styles from './SignInForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { ISignIn } from '../Auth.interface'

export default function SignInForm() {
  const t = useTranslations('Forms')

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<ISignIn>({
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<ISignIn> = async (values) => {
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
          required: { value: true, message: 'Email is required field' },
          pattern: { value: /^\S+@\S+$/i, message: 'Email is not valid' }
        })}>
        {t('email')}
      </Input>
      {errors?.email && <p className={styles.error}>{errors.email.message}</p>}
      <Input
        type='password'
        name='password'
        id='password'
        placeholder={t('enter_password')}
        obj={register('password', {
          required: { value: true, message: 'Password is required field' },
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
          maxLength: { value: 20, message: 'Password must be less than 20 characters' }
        })}>
        {t('password')}
      </Input>
      {errors?.password && <p className={styles.error}>{errors.password.message}</p>}
      <Button type='submit'>{t('sign_in')}</Button>
    </form>
  )
}
