interface Schedule {
  id: string
  subject: string
  class: string
  faculty: string
  schedule: Sched
}

interface Sched {
  day: string
  start_time: SchedTime
  end_time: SchedTime
}

interface SchedTime {
  minute: number
  hour: number
  shift: string
}

export default Schedule