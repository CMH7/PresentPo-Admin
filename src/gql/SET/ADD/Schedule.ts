import { gql } from "@apollo/client";

const ADD_SCHEDULE = gql`
	mutation Mutation($schedule: newSchedule!) {
		addSchedule(schedule: $schedule) {
			error
			message
			data {
				id
				subject
				schedule {
					day
					start_time {
						hour
						minute
						shift
					}
					end_time {
						hour
						minute
						shift
					}
				}
				faculty
				class
			}
		}
	}
`

export default ADD_SCHEDULE