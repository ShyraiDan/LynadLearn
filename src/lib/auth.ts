'use server'

import connectMongoDB from './mongodb'
import User, { IUser } from '@/interfaces/User.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getIronSession } from 'iron-session'
import { SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

interface SessionData {
  userId?: string
  userName?: string
  email?: string
  avatarUrl?: string
  description?: string
  location?: string
  isLoggedIn: boolean
}
const defaultSession: SessionData = {
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
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return session
}

// auth -> login
export const login = async (data: any) => {
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

  session.userName = userData.userName
  session.email = userData.email
  session.description = userData.description
  session.location = userData.location
  session.avatarUrl = userData.avatarUrl

  console.log('session login', session)

  await session.save()
}

export const registerUser = async (user: any) => {
  await connectMongoDB()
  const session = await getSession()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)

  const doc = new User({
    email: user.email,
    passwordHash: hash,
    userName: user.userName,
    location: user?.location,
    description: user?.description,
    avatarUrl: user?.avatarUrl
  })

  const userDoc = await doc.save()

  console.log('backend', userDoc)

  session.isLoggedIn = true
  session.userName = userDoc.userName
  session.email = userDoc.email
  session.description = userDoc.description
  session.location = userDoc.location
  session.avatarUrl = userDoc.avatarUrl

  console.log('session register', session)

  await session.save()
}
