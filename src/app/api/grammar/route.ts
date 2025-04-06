'use server'

import Grammar from '@/interfaces/Grammar.interface'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongodb'

// equals to getAllGrammar lib function
export async function GET() {
  try {
    await connectMongoDB()
    const grammar = await Grammar.find({ level: 'A1-A2' })
    const data = JSON.parse(JSON.stringify(grammar))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 })
  }
}
