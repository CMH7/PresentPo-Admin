import { gql } from "@apollo/client";

const GET_SCHEDULE = gql`
  query GetSchedule($getScheduleId: ID!) {
    getSchedule(id: $getScheduleId) {
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

export default GET_SCHEDULE