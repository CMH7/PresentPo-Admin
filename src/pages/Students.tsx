import QueryResult from "../components/QueryResult";
import Wrapper from "../components/Wrapper";
import { gql, useQuery } from "@apollo/client";
import Student from "../interfaces/Students";

const GET_ALL_STUDENTS = gql`
  query getAllStudents {
    studentsForManageStudentsPage {
      id
      name {
        first
      }
      school_id
      age
      sex
      email
      password
      year
      section
      semester
      subjects
    }
  }
`

export default function Students() {
  const { loading, error, data } = useQuery(GET_ALL_STUDENTS);

  return (
    <Wrapper centered={true}>
      <QueryResult error={error} loading={loading} data={data}>
        <div className="w-full h-fit flex flex-col justify-center items-center gap-y-3">
          {data?.studentsForManageStudentsPage?.map((student: Student, index: number) => (
            <div key={student.id} className="w-2/4 p-5 rounded-xl bg-white text-ellipsis overflow-hidden">
              {JSON.stringify(student)}
            </div>
          ))}
        </div>
      </QueryResult>
    </Wrapper>
  )
}