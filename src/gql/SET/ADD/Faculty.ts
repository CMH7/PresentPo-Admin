import { gql } from "@apollo/client";

const ADD_FACULTY = gql`
	mutation addFaculty($newFaculty: newFaculty!) {
  addFaculty(newFaculty: $newFaculty) {
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

export default ADD_FACULTY