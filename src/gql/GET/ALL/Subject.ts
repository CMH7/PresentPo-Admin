import { gql } from "@apollo/client";

const ALL_SUBJECTS = gql`
  query GetAllSubjectsWithFilters($filters: subjectFilters!) {
    getAllSubjectsWithFilters(filters: $filters) {
      error
      message
      data {
        id
        code
        name
      }
    }
  }
`

export default ALL_SUBJECTS