'use server'

import Grammar from '@/interfaces/Grammar.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'
import mongoose from 'mongoose'

// equals to getSingleGrammar lib function
export async function GET(req: Request) {
  const url = new URL(req.url)
  const grammarId = url.pathname.split('/').pop() ?? ''

  try {
    await connectMongoDB()

    if (!mongoose.Types.ObjectId.isValid(grammarId)) {
      return NextResponse.json({ message: 'Grammar not found' }, { status: 404 })
    }

    const grammar = await Grammar.findById(grammarId)
    const data = JSON.parse(JSON.stringify(grammar))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
