import { gql } from "@apollo/client";

const ALL_ATTENDANCES = gql`
  query GetAllAttendancesWithFilters($filters: attendanceFilters!) {
    getAllAttendancesWithFilters(filters: $filters) {
      error
      message
      data {
        id
        date {
          minute
          hour
          day
          month
          year
        }
        qr
        schedule
        special
        label
      }
    }
  }
`

export default ALL_ATTENDANCES