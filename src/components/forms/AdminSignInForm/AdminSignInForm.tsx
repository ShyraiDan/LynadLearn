'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import { P } from '@/components/ui/Typography/Typography'
import Button from '@/components/ui/Button/Button'
import { loginAdmin } from '@/lib/auth'
import { useRouter } from 'next/navigation'

import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

export interface ISignIn {
  email: string
  password: string
}

export default function AdminSignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ISignIn>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<ISignIn> = async (values) => {
    const result = await loginAdmin(values)

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

      <div className="relative flex flex-col !mt-1.5">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="Enter password"
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
      {errors?.password && <P className="text-red">{errors.password.message}</P>}
      <Button className="!rounded mt-4 w-full" type="submit">
        Sign in
      </Button>
    </form>
  )
}
