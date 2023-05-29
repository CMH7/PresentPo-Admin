import { gql } from "@apollo/client";

const ALL_FACULTY = gql`
  query getAllFacultyWithFilters($filters: facultyFilters) {
    getAllFacultyWithFilters(filters: $filters) {
      error
      message
      data {
        id
        name {
          first
          middle
          last
          extension
        }
        credentials
        username
      }
    }
  }
`

export default ALL_FACULTY