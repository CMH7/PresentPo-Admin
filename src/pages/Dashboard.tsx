import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import QueryResult from "../components/QueryResult";

const CHECK_ADMIN_CREDENTIALS = gql`
  query CheckAdminCredentials($email: String!, $password: String!) {
    checkAdminCredentials(email: $email, password: $password)
  }
`

export default function Dashboard() {
  const navigate = useNavigate()
  const [ checkAdminCredentials, { loading, data} ] = useLazyQuery(CHECK_ADMIN_CREDENTIALS)

  const checkCreds = () => {
    checkAdminCredentials({ variables: { email: localStorage.getItem('email'), password: localStorage.getItem('pass') } }).then(res => {
      if (!res?.data?.checkAdminCredentials) {
        navigate('/', {
          replace: true
        })
      }
    }).catch(err => {
      navigate('/', {
        replace: true
      })
    })
    
  }

  useEffect(() => {
    document.title = 'Dashboard';

    if (localStorage.getItem('email') != null && localStorage.getItem('pass') != null) {
      checkCreds()
    } else {
      navigate('/', {
        replace: true
      })
    }
  }, [])

  return (
    <Wrapper centered={true}>
      <QueryResult loading={loading} data={data?.checkAdminCredentials} error={null}>
        <h1>Dashboard</h1>
      </QueryResult>
    </Wrapper>
  )
}