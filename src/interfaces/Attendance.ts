interface Attendance {
  id: string
  date: attDate
  qr: string
  schedule: string
  special: boolean
  label: string
}

interface attDate {
  minute: number
  hour: number
  day: number
  month: number
  year: number
}

export default Attendance