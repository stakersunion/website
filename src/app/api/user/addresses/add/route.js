import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import User from '@/models/user'
import { GeonodeScraperApi } from 'geonode-scraper-api'
import { parse } from 'node-html-parser'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { id } = await currentUser()
  const { signature, type } = await req.json()

  async function fetchSignature(signature) {
    const scraper = new GeonodeScraperApi(
      process.env.GEONODE_USERNAME,
      process.env.GEONODE_PASSWORD
    )

    const config = {
      js_render: false,
      response_format: 'html',
      block_resources: true,
      HTMLMinifier: { useMinifier: true },
    }

    const response = await scraper.scrape(signature, config)
    const root = parse(response.data)

    const address = root.querySelector('#ContentPlaceHolder1_txtAddressReadonly').attributes.value
    const oath = root.querySelector('#ContentPlaceHolder1_txtSignedMessageReadonly').innerText

    return { address, oath }
  }

  if (!id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    // Check that signature is valid from Etherscan
    const validEtherscanUrl = /^https:\/\/etherscan\.io\/verifySig\/\d+$/
    if (!validEtherscanUrl.test(signature)) {
      return NextResponse.json({ error: 'Invalid signature URL' }, { status: 400 })
    }
    const urlParts = signature.split('/')
    const numericPart = urlParts[urlParts.length - 1]
    if (numericPart.length < 6 || numericPart.length > 12) {
      return NextResponse.json({ error: 'Invalid signature URL' }, { status: 400 })
    }

    const { address, oath } = await fetchSignature(signature)

    // Check if address is already used
    const existingAddress = await User.findOne({
      'addresses.address': address,
    })

    if (existingAddress) {
      return NextResponse.json({ error: 'Address already used' }, { status: 400 })
    }

    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 400 })
    }

    if (!oath || !oath.includes('Night gathers, and now my stake begins')) {
      return NextResponse.json({ error: 'Invalid Oath' }, { status: 400 })
    }

    await connect()
    const user = await User.findOne({ id })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    user.addresses.push({ address, type })
    await user.save()

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
