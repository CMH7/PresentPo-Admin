import { gql } from "@apollo/client";

const ADD_STUDENT = gql`
	mutation AddStudent($newStudent: newStudent!) {
		addStudent(newStudent: $newStudent) {
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

export default ADD_STUDENT