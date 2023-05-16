import { gql } from "@apollo/client";

const ALL_CLASS = gql`
  query GetAllSubjectsWithFilters {
    getAllClassWithFilters {
      error
      message
      data {
        id
        strand
        year
        section
        students
      }
    }
  }
`

export default ALL_CLASS