'use server'

import connectMongoDB from './mongodb'
import User, { IUser, IUserDTO } from '@/interfaces/User.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { NextResponse } from 'next/server'

export const authMe = async () => {
  try {
    await connectMongoDB()
    const users = await User.find()
    console.log('backend', users)

    return users
  } catch (error: any) {
    // return NextResponse.redirect('/login')
    throw new Error(error)
  }
}

export const register = async (user: IUserDTO) => {
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
