import { gql } from "@apollo/client";

const DELETE_FACULTY = gql`
  mutation Mutation($deleteFacultyId: ID!) {
    deleteFaculty(id: $deleteFacultyId) {
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

export default DELETE_FACULTY