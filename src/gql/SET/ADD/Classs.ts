import { gql } from "@apollo/client";

const ADD_CLASS = gql`
	mutation addClass($newClass: newClass!) {
		addClass(newClass: $newClass) {
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

export default ADD_CLASS