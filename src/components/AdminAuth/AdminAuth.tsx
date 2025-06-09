'use client'

import { useState } from 'react'
import AdminSignUpForm from '@/components/forms/AdminSignUpForm/AdminSignUpForm'
import { H1 } from '@/components/ui/Typography/Typography'
import AdminSignInForm from '@/components/forms/AdminSignInForm/AdminSignInForm'
import { useEffect } from 'react'
import { getSession } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const AdminAuth = () => {
  const [isSignInModal, setSignInModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session.role === 'admin') {
        router.push('/admin/dashboard/achievements')
      }
    })
  }, [])

  return (
    <div className="w-full bg-white-100 p-4 box-border rounded-lg max-w-[576px]">
      {isSignInModal ? (
        <>
          <H1 className="text-center text-2xl font-bold">Sign in</H1>
          <AdminSignInForm />

          <div className="dark:text-grey-600  mt-5">
            Don&apos;t have an account?{' '}
            <span
              className="hover:text-blue-100 transition-all ease-in-out duration-300 cursor-pointer text-blue-200"
              onClick={() => setSignInModal((state) => !state)}
            >
              Sign up
            </span>
          </div>
        </>
      ) : (
        <>
          <H1 className="text-center text-2xl font-bold">Sign up</H1>
          <AdminSignUpForm />
          <div className="dark:text-grey-600 mt-5">
            Already have an account?{' '}
            <span
              className="hover:text-blue-100 transition-all ease-in-out duration-300 cursor-pointer text-blue-200"
              onClick={() => setSignInModal((state) => !state)}
            >
              Sign in
            </span>
          </div>
        </>
      )}
    </div>
  )
}
export default AdminAuth
