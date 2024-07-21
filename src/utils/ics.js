import { createEvent as createIcs } from 'ics'

const createEvent = ({
  time = Date.now(),
  title = 'Stakers Union Event',
  description = '',
  setError = () => {},
}) => {
  let event = {
    duration: { minutes: 30 },
    title,
    description,
    location: 'Ethererum Mainnet',
    url: 'https://stakersunion.com',
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Thame from Stakers Union', email: 'thame@stakersunion.com' },
  }

  const dateToICSFormat = () => {
    let date = new Date(time)
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]
  }

  event.start = dateToICSFormat()

  createIcs(event, (error, value) => {
    if (error) {
      setError(error)
      return
    }

    const blob = new Blob([value], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'event.ics'
    a.click()
    URL.revokeObjectURL(url)
  })
}

export default createEvent
