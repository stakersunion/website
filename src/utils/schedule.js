const generateSchedule = () => {
  const days = 7 // Number of upcoming days
  const intervals = 10 // Times per day
  const schedule = []

  for (let i = 0; i < days; i++) {
    const date = new Date() // Start from today
    date.setDate(date.getDate() + i) // Move to the upcoming day
    date.setHours(0, 0, 0, 0) // Reset hours to start of the day

    const times = []
    for (let j = 0; j < intervals; j++) {
      const time = new Date(date) // Copy date for each time
      const minutesInterval = (24 * 60) / intervals // Calculate intervals in minutes
      const randomMinuteOffset = Math.floor(Math.random() * minutesInterval)

      time.setMinutes(j * minutesInterval + randomMinuteOffset) // Set time
      times.push(time)
    }

    schedule.push({ date: date.toDateString(), times })
  }

  return schedule
}

const getCurrentTimezone = () => {
  const date = new Date()
  const timeZoneName = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long' })
    .format(date)
    .split(', ')
    .pop()

  const utcOffset = -date.getTimezoneOffset() / 60
  const sign = utcOffset >= 0 ? '+' : '-'
  const offset = `UTC ${sign}${Math.abs(utcOffset).toString().padStart(2, '0')}:00`

  return `${timeZoneName} (${offset})`
}

export { generateSchedule, getCurrentTimezone }
