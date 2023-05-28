import { gql } from "@apollo/client";

const DELETE_STUDENT = gql`
  mutation Mutation($deleteStudentId: ID!) {
    deleteStudent(id: $deleteStudentId) {
      error
      message
      data {
        id
        school_id
        name {
          first
          middle
          last
          extension
        }
        sex
        username
        password
      }
    }
  }
`

export default DELETE_STUDENT