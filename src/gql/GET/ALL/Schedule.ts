import { gql } from "@apollo/client";

const ALL_SCHEDULE = gql`
  query GetAllSchedulesWithFilters($filters: scheduleFilters!) {
    getAllSchedulesWithFilters(filters: $filters) {
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

export default ALL_SCHEDULE