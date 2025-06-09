'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import Button from '@/components/ui/Button/Button'
import { IAdminSignUp } from '@/interfaces/Admin.interface'
import { registerAdmin } from '@/lib/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

type IAdminSignUpWithVerify = IAdminSignUp & {
  verificationCode: string
}

export default function AdminSignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<IAdminSignUpWithVerify>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<IAdminSignUpWithVerify> = async (values) => {
    const result = await registerAdmin(values)

    if (result) {
      router.push('/admin/dashboard/achievements')
    }
  }

  return (
    <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          obj={register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: { value: /^\S+@\S+$/i, message: 'Email is invalid' }
          })}
        >
          Email
        </Input>
        {errors?.email && <P className="text-red text-sm mb-1 dark:!text-red">{errors.email.message}</P>}
      </div>

      <div className="mb-2">
        <Input
          type="text"
          name="adminName"
          id="adminName"
          placeholder="Enter your name"
          obj={register('adminName', {
            required: { value: true, message: 'Name is required' },
            minLength: { value: 3, message: 'Name must be at least 3 characters' },
            maxLength: { value: 20, message: 'Name must be at most 20 characters' }
          })}
        >
          Name
        </Input>
        {errors?.adminName && <P className="text-red text-sm mb-1 dark:!text-red">{errors.adminName.message}</P>}
      </div>

      <div className="mb-2">
        <Input
          type="text"
          name="verificationCode"
          id="verificationCode"
          placeholder="Enter your verification code"
          obj={register('verificationCode', {
            required: { value: true, message: 'Code is required' },
            validate: {
              aboba: (value) => value === process.env.NEXT_PUBLIC_ADMIN_VERIFICATION_CODE || 'Code is invalid'
            }
          })}
        >
          Email
        </Input>
        {errors?.verificationCode && (
          <P className="text-red text-sm mb-1 dark:!text-red">{errors.verificationCode.message}</P>
        )}
      </div>

      <div className="relative flex flex-col !mt-1.5">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Enter your password"
          obj={register('password', {
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            maxLength: { value: 20, message: 'Password must be at most 20 characters' }
          })}
        >
          Password
        </Input>
        <span
          onClick={() => setShowPassword((state) => !state)}
          className="absolute top-[43px] right-2.5 cursor-pointer"
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
          placeholder="Confirm your password"
          obj={register('confirmPassword', {
            required: { value: true, message: 'Confirm password is required' },
            validate: (value) => value === watch('password') || 'Confirm password does not match'
          })}
        >
          Confirm password
        </Input>
        <span
          onClick={() => setShowConfirmPassword((state) => !state)}
          className="absolute top-[43px] right-2.5 cursor-pointer"
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

      <Button className="!rounded mt-4 w-full" type="submit">
        Sign up
      </Button>
    </form>
  )
}
