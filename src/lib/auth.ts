'use server'

import connectMongoDB from './mongodb'
import User from '@/interfaces/User.interface'
import bcrypt from 'bcrypt'
import { getIronSession } from 'iron-session'
import { SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ISignUp, ISignIn } from '@/components/AuthModal/components/Auth.interface'
import { revalidatePath } from 'next/cache'

export interface ISession {
  userId?: string
  userName?: string
  email?: string
  avatarUrl?: string
  description?: string
  location?: string
  isLoggedIn: boolean
  rating?: number
}
const defaultSession: ISession = {
  isLoggedIn: false
}

const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: 'lama-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}

export const getSession = async () => {
  const session = await getIronSession<ISession>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return session
}

export const login = async (data: ISignIn) => {
  await connectMongoDB()
  const session = await getSession()

  const user = await User.findOne({ email: data.email })

  if (!user) {
    return { error: 'User not found' }
  }

  const isValidPass = await bcrypt.compare(data.password, user._doc.passwordHash)

  if (!isValidPass) {
    return { error: 'Login or password incorrect' }
  }

  const { passwordHash, ...userData } = user._doc
  session.isLoggedIn = true
  session.userId = userData._id
  session.userName = userData.userName
  session.email = userData.email
  session.description = userData.description
  session.location = userData.location
  session.avatarUrl = userData.avatarUrl
  session.rating = userData.rating

  await session.save()
}

export const registerUser = async (user: ISignUp) => {
  await connectMongoDB()
  const session = await getSession()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)

  const doc = new User({
    email: user.email,
    passwordHash: hash,
    userName: user.userName,
    location: '',
    description: '',
    avatarUrl: '',
    rating: 0
  })

  const userDoc = await doc.save()

  session.isLoggedIn = true
  session.userId = userDoc._id
  session.userName = userDoc.userName
  session.email = userDoc.email
  session.description = userDoc.description
  session.location = userDoc.location
  session.avatarUrl = userDoc.avatarUrl

  await session.save()
}

export const logout = async () => {
  const session = await getSession()
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')

  session.destroy()
  redirect(`/${locale?.value}`)
}

export const updateUser = async (user: any) => {
  const session = await getSession()

  await connectMongoDB()
  await User.updateOne(
    { _id: session.userId },
    {
      userName: user.userName,
      description: user.description,
      location: user.location
    }
  )

  session.userName = user.userName
  session.description = user.description
  session.location = user.location

  await session.save()

  revalidatePath('[locale]/dashboard/profile', 'page')
}
