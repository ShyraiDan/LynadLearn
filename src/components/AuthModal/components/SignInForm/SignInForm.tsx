'use client'

import styles from './SignInForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { ISignIn } from '../Auth.interface'
import { login } from '@/lib/auth'
import { useState } from 'react'
import { P } from '@/components/ui/Typography/Typography'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

export default function SignInForm({ handleClose }: { handleClose: () => void }) {
  const t = useTranslations('Forms')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ISignIn>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<ISignIn> = async (values) => {
    login(values)
    handleClose()
  }

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder={t('enter_your_email')}
        obj={register('email', {
          required: { value: true, message: t('email_required') },
          pattern: { value: /^\S+@\S+$/i, message: t('email_invalid') }
        })}
      >
        {t('email')}
      </Input>
      {errors?.email && <P className="text-red text-sm mb-1 dark:!text-red">{errors.email.message}</P>}
      <div className="relative flex flex-col !mt-1.5">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder={t('enter_password')}
          obj={register('password', {
            required: { value: true, message: t('password_required') },
            minLength: { value: 8, message: t('password_minLength') },
            maxLength: { value: 20, message: t('password_maxLength') }
          })}
        >
          {t('password')}
        </Input>
        <span
          onClick={() => setShowPassword((state) => !state)}
          className="absolute top-[39px] right-2.5 cursor-pointer"
        >
          {showPassword ? (
            <FaEye
              size={16}
              className="dark:text-white-100 dark:lg:hover:text-purple-100 transition-all duration-200"
            />
          ) : (
            <FaEyeSlash
              size={16}
              className="dark:text-white-100 dark:lg:hover:text-purple-100 transition-all duration-200"
            />
          )}
        </span>
      </div>
      {errors?.password && <P className="text-red text-sm mb-1 dark:!text-red">{errors.password.message}</P>}
      <Button type="submit">{t('sign_in')}</Button>
    </form>
  )
}
