'use client'

import styles from './SignUpForm.module.scss'
import { Input } from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ISignUp } from '../Auth.interface'
import { registerUser } from '@/lib/auth'
import { useState } from 'react'
import { P } from '@/components/ui/Typography/Typography'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

interface SignUpFormProps {
  handleClose: () => void
}

export default function SignUpForm({ handleClose }: SignUpFormProps) {
  const t = useTranslations('Forms')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<ISignUp>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<ISignUp> = async (values) => {
    await registerUser(values)
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
      <Input
        type="text"
        name="userName"
        id="userName"
        placeholder={t('enter_your_name')}
        obj={register('userName', {
          required: { value: true, message: t('name_required') },
          minLength: { value: 3, message: t('name_minLength') },
          maxLength: { value: 20, message: t('name_maxLength') }
        })}
      >
        {t('user_name')}
      </Input>
      {errors?.userName && <P className="text-red text-sm mb-1 dark:!text-red">{errors.userName.message}</P>}
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
      <div className="relative flex flex-col !mt-1.5">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          id="confirmPassword"
          placeholder={t('confirm_your_password')}
          obj={register('confirmPassword', {
            required: { value: true, message: t('confirm_password_required') },
            validate: (value) => value === watch('password') || t('confirm_password_mismatch')
          })}
        >
          {t('confirm_password')}
        </Input>
        <span
          onClick={() => setShowConfirmPassword((state) => !state)}
          className="absolute top-[39px] right-2.5 cursor-pointer"
        >
          {showConfirmPassword ? (
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
      {errors?.confirmPassword && (
        <P className="text-red text-sm mb-1 dark:!text-red">{errors.confirmPassword.message}</P>
      )}
      <Button type="submit">{t('sign_up')}</Button>
    </form>
  )
}
