// import { ISession } from '@/lib/auth'
// import { getIronSession, SessionOptions } from 'iron-session'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// const defaultSession: ISession = {
//   isLoggedIn: false
//   // theme: 'light'
// }

// const sessionOptions: SessionOptions = {
//   password: process.env.SECRET_KEY!,
//   cookieName: 'lama-session',
//   cookieOptions: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production'
//   }
// }

// export async function GET(req: Request) {
//   try {
//     const session = await getIronSession<ISession>(cookies(), sessionOptions)

//     if (!session.isLoggedIn) {
//       session.isLoggedIn = defaultSession.isLoggedIn
//       // session.theme = defaultSession.theme
//     }

//     return NextResponse.json(session)
//   } catch (error) {
//     return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
//   }
// }
