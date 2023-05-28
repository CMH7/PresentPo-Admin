import { gql } from "@apollo/client";

const GET_CLASS = gql`
  query GetClass($getClassId: ID!) {
    getClass(id: $getClassId) {
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

export default GET_CLASS