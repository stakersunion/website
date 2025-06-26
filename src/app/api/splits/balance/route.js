import { NextResponse } from 'next/server'
import { clients } from '@/utils/splits'
import { chains } from '@/utils/chains'

export async function GET() {
  let data = {}

  try {
    for (const key of Object.keys(clients)) {
      const clientData = await clients[key].dataClient.getSplitEarnings({
        chainId: parseInt(chains[key].id),
        splitAddress: clients[key].splitAddress,
        erc20TokenList: [],
      })

      data[key] = JSON.parse(
        JSON.stringify(clientData, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        )
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 })
  }
}
