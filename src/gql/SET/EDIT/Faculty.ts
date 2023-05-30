import { gql } from "@apollo/client";

const EDIT_FACULTY = gql`
	mutation updateFaculty($updateFacultyId: ID!, $updatedFaculty: updatedFaculty!) {
		updateFaculty(id: $updateFacultyId, updatedFaculty: $updatedFaculty) {
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
				email
				password
			}
		}
	}
`

export default EDIT_FACULTY