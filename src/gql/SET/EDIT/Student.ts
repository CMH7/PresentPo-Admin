import { gql } from "@apollo/client";

const EDIT_STUDENT = gql`
	mutation UpdateStudent($updateStudentId: ID!, $updatedStudent: updatedStudent!) {
		updateStudent(id: $updateStudentId, updatedStudent: $updatedStudent) {
			error
			message
			data {
				id
				school_id
				name {
					first
					middle
					last
					extension
				}
				sex
				username
				password
			}
		}
	}
`

export default EDIT_STUDENT