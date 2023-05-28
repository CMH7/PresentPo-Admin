import { gql } from "@apollo/client";

const GET_FACULTY = gql`
  query GetFaculty($getFacultyId: ID!) {
    getFaculty(id: $getFacultyId) {
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
        password
      }
    }
  }
`

export default GET_FACULTY