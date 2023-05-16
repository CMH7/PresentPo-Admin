import { gql } from "@apollo/client";

const ALL_CLASS = gql`
  query GetAllClassWithFilters($filters: classFilters) {
    getAllClassWithFilters(filters: $filters) {
      error
      message
      data {
        id
        strand
        year
        section
        semester
        students
        sy
      }
    }
  }
`

export default ALL_CLASS