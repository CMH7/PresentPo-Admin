import Datee from "./Date"

interface Attendance {
  id: string
  date: Datee
  qr: string
  schedule: string
  special: boolean
  label: string
}

export default Attendance