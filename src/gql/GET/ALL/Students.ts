import { gql } from "@apollo/client";

const ALL_STUDENTS = gql`
  query GetAllStudentsWithFilters($filters: studentFilters!) {
    getAllStudentsWithFilters(filters: $filters) {
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
        age
        sex
        email
        password
      }
    }
  }
`

export default ALL_STUDENTS