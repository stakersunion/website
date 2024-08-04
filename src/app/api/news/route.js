import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import News from '@/models/news'

export async function GET(req) {
  await connect()
  const news = await News.find()
  return NextResponse.json(news, { status: 200 })
}
