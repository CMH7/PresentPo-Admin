import { gql } from "@apollo/client";

const EDIT_CLASSS = gql`
  mutation Mutation($updateClassId: ID!, $updatedClass: updatedClass!) {
    updateClass(id: $updateClassId, updatedClass: $updatedClass) {
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

export default EDIT_CLASSS