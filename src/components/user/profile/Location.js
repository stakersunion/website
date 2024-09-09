import { useState } from 'react'
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faLocationArrow } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Location = ({ field, isLoading }) => {
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState([0, 0])
  const [tooltip, setTooltip] = useState('')

  if (isLoading) {
    return (
      <div className={'flex flex-1 flex-col relative'}>
        <Label className={'mb-2'}>Region</Label>
        <Skeleton className={'h-[300px]'} />
      </div>
    )
  }

  return (
    <div className={'flex flex-1 flex-col relative'}>
      <Label className={'mb-2'}>Region</Label>
      <div className={'absolute flex flex-col top-4 right-4 z-10'}>
        <div
          className={
            'flex w-8 h-8 items-center justify-center bg-muted hover:bg-neutral-700 rounded-t-sm transition'
          }
          onClick={() => setZoom(zoom + 0.2)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div
          className={
            'flex w-8 h-8 items-center justify-center bg-muted hover:bg-neutral-700 rounded-b-sm transition'
          }
          onClick={() => setZoom(zoom - 0.2)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div
          className={
            'flex w-8 h-8 mt-1 items-center justify-center bg-muted hover:bg-neutral-700 rounded-sm transition'
          }
          onClick={() => {
            setCenter([0, 0])
            setZoom(1)
          }}
        >
          <FontAwesomeIcon icon={faLocationArrow} />
        </div>
      </div>
      {tooltip && <Badge className={'absolute bottom-4'}>{tooltip}</Badge>}
      <div className={'rounded-sm overflow-hidden'}>
        <ComposableMap projection={'geoMercator'}>
          <ZoomableGroup
            zoom={zoom}
            center={center}
            onMoveStart={({ coordinates, zoom }) => {
              setCenter(coordinates)
              setZoom(zoom)
            }}
            onMoveEnd={({ coordinates, zoom }) => {
              setCenter(coordinates)
              setZoom(zoom)
            }}
          >
            <Geographies geography={require('@/data/world-continents.json')}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      field.value === geo.properties.continent
                        ? field.onChange('')
                        : field.onChange(geo.properties.continent)
                    }}
                    onMouseEnter={() => {
                      setTooltip(geo.properties.continent)
                    }}
                    onMouseLeave={() => {
                      setTooltip('')
                    }}
                    stroke={'transparent'}
                    style={{
                      default: {
                        fill: field.value === geo.properties.continent ? '#ffffff' : '#222222',
                        outline: 'none',
                      },
                      hover: {
                        fill: field.value === geo.properties.continent ? '#ffffff' : '#444444',
                        strokeWidth: 0,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#ffffff',
                        strokeWidth: 0,
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  )
}

export default Location
