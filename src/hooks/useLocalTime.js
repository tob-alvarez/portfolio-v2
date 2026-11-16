import { useEffect, useState } from 'react'

const format = (timeZone) => new Intl.DateTimeFormat('es-AR', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())

/** Hora actual (HH:MM) en una zona horaria, actualizada cada medio minuto. */
export default function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone))
  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 30_000)
    return () => clearInterval(id)
  }, [timeZone])
  return time
}
