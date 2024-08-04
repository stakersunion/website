import { NextResponse } from 'next/server'
import connect from '@/utils/mongoose'
import News from '@/models/news'

export async function GET(req) {
  await connect()
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  let news
  if (id) {
    news = await News.findById(id)
    if (!news) {
      return NextResponse.json({ message: 'News item not found' }, { status: 404 })
    }
  } else {
    news = await News.find()
  }

  return NextResponse.json(news, { status: 200 })
}

export async function POST(req) {
  const body = await req.json()
  await connect()
  const news = new News(body)
  await news.save()
  return NextResponse.json(news, { status: 200 })
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  await connect()
  await News.findByIdAndDelete(id)
  return NextResponse.json({ message: 'News deleted' }, { status: 200 })
}

export async function PUT(req) {
  const body = await req.json()
  const { id } = body
  await connect()
  const news = await News.findByIdAndUpdate(id, body, { new: true })
  return NextResponse.json(news, { status: 200 })
}
