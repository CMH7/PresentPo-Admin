interface Student {
  id: string
  school_id: string
  name: StudentName
  sex: string
  email: string
  password: string
}

interface StudentName {
  first: string
  middle: string
  last: string
  extension: string
}

export default Student;