import { gql } from "@apollo/client";

const DELETE_SCHEDULE = gql`
  mutation Mutation($deleteScheduleId: ID!) {
    deleteSchedule(id: $deleteScheduleId) {
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

export default DELETE_SCHEDULE