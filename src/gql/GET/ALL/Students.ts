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
        sex
        username
        password
      }
    }
  }
`

export default ALL_STUDENTS