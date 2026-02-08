'use client'

import { useMemo, useState } from 'react'
import { mutedPalette } from '@/components/dashboard/colors'

const center = 110
const radius = 92
const innerRadius = 50

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

const describeSlice = (startAngle, endAngle) => {
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
  const start = polarToCartesian(center, center, radius, startAngle)
  const end = polarToCartesian(center, center, radius, endAngle)

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

const PieDistribution = ({ items, total, emptyLabel = 'No data reported' }) => {
  const [hoveredKey, setHoveredKey] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)
  const activeKey = hoveredKey || selectedKey

  const segments = useMemo(() => {
    const sortedItems = [...items]
      .map((item) => ({
        ...item,
        count: item.count || 0,
      }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))

    let currentAngle = 0
    return sortedItems.map((item, index) => {
      const count = item.count
      const angle = total ? (count / total) * 360 : 0
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle
      const midAngle = startAngle + angle / 2
      const percent = total ? Math.round((count / total) * 100) : 0

      return {
        ...item,
        count,
        percent,
        color: mutedPalette[index % mutedPalette.length],
        angle,
        startAngle,
        endAngle,
        midAngle,
      }
    })
  }, [items, total])

  return (
    <div className={'grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]'}>
      <div className={'relative mx-auto h-56 w-56'}>
        <svg
          viewBox={'0 0 220 220'}
          className={'h-full w-full'}
        >
          {total === 0 && <circle cx={center} cy={center} r={radius} fill={'#e5e7eb'} />}
          {segments
            .filter((segment) => segment.angle > 0)
            .map((segment) => {
              const isActive = activeKey === segment.key
              const isDimmed = activeKey && !isActive
              const offset = isActive ? 7 : 0
              const offsetPoint = polarToCartesian(center, center, offset, segment.midAngle)

              return (
                <path
                  key={segment.key}
                  d={describeSlice(segment.startAngle, segment.endAngle)}
                  fill={segment.color}
                  transform={`translate(${offsetPoint.x - center} ${offsetPoint.y - center})`}
                  className={'cursor-pointer transition-all duration-200'}
                  style={{ opacity: isDimmed ? 0.25 : 1 }}
                  onMouseEnter={() => setHoveredKey(segment.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    setSelectedKey((previous) => (previous === segment.key ? null : segment.key))
                  }
                />
              )
            })}
          <circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill={'hsl(var(--background))'}
            stroke={'hsl(var(--border))'}
          />
        </svg>
        <div
          className={
            'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'
          }
        >
          <p className={'text-2xl font-bold'}>{total}</p>
          <p className={'text-xs text-muted-foreground'}>{total ? 'reported' : emptyLabel}</p>
        </div>
      </div>

      <div className={'space-y-2'}>
        {segments.map((segment) => {
          const isActive = activeKey === segment.key
          const isDimmed = activeKey && !isActive

          return (
            <button
              key={segment.key}
              type={'button'}
              className={
                'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/40'
              }
              style={{ opacity: isDimmed ? 0.45 : 1 }}
              onMouseEnter={() => setHoveredKey(segment.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onClick={() =>
                setSelectedKey((previous) => (previous === segment.key ? null : segment.key))
              }
            >
              <div className={'flex items-center gap-2'}>
                <span
                  className={'h-3 w-3 rounded-sm'}
                  style={{ backgroundColor: segment.color }}
                />
                <span className={isActive ? 'font-medium' : ''}>{segment.label}</span>
              </div>
              <span className={'text-muted-foreground'}>
                {segment.count} ({segment.percent}%)
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PieDistribution
