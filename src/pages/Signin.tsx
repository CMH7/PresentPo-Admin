import TitleLogo from "../components/TitleLogo";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from 'react'
import PTextfield from "../components/forms/PTextfield";
import PPassfield from "../components/forms/PPassfield";
import { useNavigate } from 'react-router-dom'
import PrimaryButton from "../components/buttons/PrimaryButton";
import { gql, useLazyQuery } from "@apollo/client";
import QueryResult from "../components/QueryResult";
import { PropagateLoader } from "react-spinners";

const CHECK_ADMIN_CREDENTIALS = gql`
  query CheckAdminCredentials($email: String!, $password: String!) {
    checkAdminCredentials(email: $email, password: $password)
  }
`

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const navigate = useNavigate()

  const [ checkAdminCredentials, { loading, data} ] = useLazyQuery(CHECK_ADMIN_CREDENTIALS)

  const checkCreds = async () => {
    if (email !== '' && password !== '') {
      checkAdminCredentials({ variables: { email, password } }).then(res => {
        if (res?.data?.checkAdminCredentials) {        
          localStorage.setItem('email', email)
          localStorage.setItem('pass', password)
          
          console.log('navigating to dashboard');
          
          navigate('/dashboard', {
            replace: true
          })
        } else {
          // show a modal that email or password is incorrect.
          console.log('error');
          localStorage.clear()
        }
      })
    }
  }

  useEffect(() => {
    document.title = 'PresentPo | Signin';
    localStorage.clear()
  }, []);

  return (
    <Wrapper centered={true}>
      {
        loading ?
          <PropagateLoader color="#fff" />
          :
          <>
            <TitleLogo />

            <div className="flex flex-col items-center gap-y-4 mt-20 w-3/6">
              <div className="w-full lg:w-3/5">
                <PTextfield disabled={false} placeholder="Email" value={email} valueSetter={setEmail} />
              </div>
              <div className="w-full lg:w-3/5">
                <PPassfield disabled={false} value={password} valueSetter={setPass} />
              </div>
            </div>

            <div className="w-3/5 lg:w-[236px] h-14 mt-16">
              <PrimaryButton name="Sign in" onClick={checkCreds} />
            </div>
          </>
      }
    </Wrapper>
  )
}