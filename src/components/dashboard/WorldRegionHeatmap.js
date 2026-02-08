'use client'

import { useMemo, useState } from 'react'
import { geoCentroid } from 'd3-geo'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { regionPalette } from '@/components/dashboard/colors'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const regionOrder = [
  { key: 'North America', label: 'North America' },
  { key: 'South America', label: 'South America' },
  { key: 'Europe', label: 'Europe' },
  { key: 'Asia', label: 'Asia' },
  { key: 'Africa', label: 'Africa' },
  { key: 'Oceania', label: 'Oceania' },
]

const getRegionFromCentroid = ([lng, lat]) => {
  if (lng < -30 && lat >= 12) return 'North America'
  if (lng < -30 && lat < 12) return 'South America'
  if (lng >= -25 && lng <= 60 && lat >= 35) return 'Europe'
  if (lng >= -25 && lng <= 60 && lat < 35 && lat >= -40) return 'Africa'
  if (lng > 60 || (lng > 25 && lat >= -10)) return 'Asia'
  if (lat < -10 && lng > 110) return 'Oceania'
  if (lat < -10 && lng >= 60) return 'Oceania'
  return null
}

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const bigint = Number.parseInt(value, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

const toRgba = (hex, alpha) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getRegionFill = ({ region, count, maxCount, activeRegion }) => {
  if (!region || !count || !maxCount) return '#eef2f7'

  const baseColor = regionPalette[region] || '#808b9a'
  const intensity = count / maxCount
  const regionAlpha = 0.3 + intensity * 0.55

  if (activeRegion && activeRegion !== region) {
    return '#eef2f7'
  }

  if (activeRegion && activeRegion === region) {
    return toRgba(baseColor, 1)
  }

  return toRgba(baseColor, Number(regionAlpha.toFixed(2)))
}

const WorldRegionHeatmap = ({ regions, totalMembers }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const activeRegion = hoveredRegion || selectedRegion

  const maxCount = useMemo(() => Math.max(...Object.values(regions || {}), 0), [regions])
  const sortedRegions = useMemo(
    () =>
      [...regionOrder]
        .map((region) => ({
          ...region,
          count: regions?.[region.key] || 0,
          percent: totalMembers ? Math.round(((regions?.[region.key] || 0) / totalMembers) * 100) : 0,
        }))
        .sort((a, b) => b.percent - a.percent || a.label.localeCompare(b.label)),
    [regions, totalMembers]
  )

  return (
    <div className={'space-y-4'}>
      <div className={'rounded-md border bg-muted/20 p-3'}>
        <ComposableMap
          projection={'geoEqualEarth'}
          projectionConfig={{ scale: 150 }}
          width={980}
          height={430}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo)
                const region = getRegionFromCentroid(centroid)
                const count = region ? regions?.[region] || 0 : 0
                const fill = getRegionFill({
                  region,
                  count,
                  maxCount,
                  activeRegion,
                })

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => region && setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() =>
                      region &&
                      setSelectedRegion((previous) => (previous === region ? null : region))
                    }
                    style={{
                      default: {
                        fill,
                        outline: 'none',
                        stroke: 'none',
                      },
                      hover: {
                        fill,
                        outline: 'none',
                        stroke: 'none',
                      },
                      pressed: {
                        fill,
                        outline: 'none',
                        stroke: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <p className={'text-xs text-muted-foreground'}>
        Hover or click a region row (or map area) to focus the map.
      </p>

      <div className={'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'}>
        {sortedRegions.map((region) => {
          const count = region.count
          const percent = region.percent
          const isActive = activeRegion === region.key
          const isDimmed = activeRegion && activeRegion !== region.key

          return (
            <button
              key={region.key}
              type={'button'}
              className={
                'flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/40'
              }
              style={{ opacity: isDimmed ? 0.45 : 1 }}
              onMouseEnter={() => setHoveredRegion(region.key)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() =>
                setSelectedRegion((previous) => (previous === region.key ? null : region.key))
              }
            >
              <div className={'flex items-center gap-2'}>
                <span
                  className={'h-3 w-3 rounded-sm'}
                  style={{
                    backgroundColor: getRegionFill({
                      region: region.key,
                      count,
                      maxCount,
                      activeRegion: isActive ? region.key : null,
                    }),
                  }}
                />
                <span className={isActive ? 'font-medium' : ''}>{region.label}</span>
              </div>
              <span className={'text-muted-foreground'}>
                {count} ({percent}%)
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default WorldRegionHeatmap
