interface Student {
  id: string
  school_id: string
  name: StudentName
  age: number
  sex: string
  email: string
  password: string
  year: number
  section: number
  semester: number
  subjects: string[]
}

interface StudentName {
  first: string
  middle: string
  last: string
}

export default Student;