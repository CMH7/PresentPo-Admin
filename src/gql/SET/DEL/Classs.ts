import { gql } from "@apollo/client";

const DELETE_CLASS = gql`
  mutation Mutation($deleteClassId: ID!) {
    deleteClass(id: $deleteClassId) {
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

export default DELETE_CLASS