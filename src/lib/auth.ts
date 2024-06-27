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

  console.log('backend', userData)
  console.log('session', session)

  await session.save()
}

export const registerUser = async (user: any) => {
  try {
    await connectMongoDB()

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

    const token = jwt.sign(
      {
        _id: userDoc._id
      },
      'secret123',
      {
        expiresIn: '1d'
      }
    )

    const { passwordHash, ...userData } = userDoc._doc

    console.log('backend', userData)
    console.log('backend token', token)

    return { ...userData, token }
  } catch (error: any) {
    // return NextResponse.redirect('/login')
    throw new Error(error)
  }
}
