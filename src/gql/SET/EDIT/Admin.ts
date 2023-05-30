import { gql } from "@apollo/client";

const EDIT_ADMIN = gql`
mutation UpdateAdmin($updateAdminId: ID!, $updatedAdmin: updatedAdmin!) {
  updateAdmin(id: $updateAdminId, updatedAdmin: $updatedAdmin) {
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
      email
      password
    }
  }
}
`

export default EDIT_ADMIN