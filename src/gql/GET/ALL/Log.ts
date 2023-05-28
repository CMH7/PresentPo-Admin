import { gql } from "@apollo/client";

const ALL_LOGS = gql`
  query GetAllLogsWithFilters($filters: logFilter) {
    getAllLogsWithFilters(filters: $filters) {
      error
      message
      data {
        id
        collection
        message
        date {
          minute
          hour
          day
          month
          year
        }
      }
    }
  }
`

export default ALL_LOGS