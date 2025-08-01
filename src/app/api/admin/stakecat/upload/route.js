import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connect from '@/utils/mongoose'
import StakeCat from '@/models/stakecat'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is admin
  if (!user.publicMetadata?.role || user.publicMetadata.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const column = formData.get('column')

    if (!file || !column) {
      return NextResponse.json({ error: 'File and column are required' }, { status: 400 })
    }

    if (!file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'File must be a CSV' }, { status: 400 })
    }

    await connect()

    const addresses = []
    const source = file.name

    // Parse CSV with auto-detection of separator
    const csvText = await file.text()
    const lines = csvText.split('\n')
    
    // Auto-detect separator (comma or tab)
    const firstLine = lines[0]
    let separator = ','
    if (firstLine.includes('\t')) {
      separator = '\t'
    }
    
    const headers = lines[0].split(separator).map(h => h.trim().replace(/"/g, ''))
    
    if (!headers.includes(column)) {
      return NextResponse.json({ error: 'Selected column not found in CSV' }, { status: 400 })
    }

    const columnIndex = headers.indexOf(column)

    // Process each line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = line.split(separator).map(v => v.trim().replace(/"/g, ''))
      const address = values[columnIndex]

      if (address && address.length > 0) {
        addresses.push({
          address: address.toLowerCase(),
          source: source
        })
      }
    }

    if (addresses.length === 0) {
      return NextResponse.json({ error: 'No valid addresses found in selected column' }, { status: 400 })
    }

    // Process addresses in chunks to avoid timeout
    const CHUNK_SIZE = 1000
    let totalInserted = 0
    let totalUpdated = 0

    for (let i = 0; i < addresses.length; i += CHUNK_SIZE) {
      const chunk = addresses.slice(i, i + CHUNK_SIZE)
      
      const operations = chunk.map(addr => ({
        updateOne: {
          filter: { address: addr.address },
          update: { $set: addr },
          upsert: true
        }
      }))

      const result = await StakeCat.bulkWrite(operations)
      totalInserted += result.upsertedCount || 0
      totalUpdated += result.modifiedCount || 0
    }

    return NextResponse.json({
      message: `Successfully processed ${addresses.length} addresses`,
      inserted: totalInserted,
      updated: totalUpdated
    })

  } catch (error) {
    console.error('Error uploading CSV:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
} 