export const currentDate = () => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(changeTimezone(new Date()))

  function changeTimezone(date) {
    const invdate = new Date(
      date.toLocaleString('en-US', {
        timeZone: process.env.TIME_ZONE || 'Europe/Minsk',
      }),
    )
    const diff = date.getTime() - invdate.getTime()
    return new Date(date.getTime() - diff)
  }
}
