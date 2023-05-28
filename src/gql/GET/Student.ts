import { gql } from "@apollo/client";

const GET_STUDENT = gql`
	query GetStudent($getStudentId: ID!) {
		getStudent(id: $getStudentId) {
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
			error
			message
		}
	}
`

export default GET_STUDENT