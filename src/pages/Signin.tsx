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

  const checkCreds = () => {
    if (email !== '' && password !== '') {
      checkAdminCredentials({ variables: { email, password } })
      
      if (data?.checkAdminCredentials) {        
        localStorage.setItem('email', email)
        localStorage.setItem('pass', password)
  
        navigate('/dashboard', {
          replace: true
        })
      } else {
        // show a modal that email or password is incorrect.
        localStorage.clear()
      }
    } else  if (localStorage.getItem('email') != null && localStorage.getItem('pass') != null) {
      checkAdminCredentials({ variables: { email: localStorage.getItem('email'), password: localStorage.getItem('pass') } })

      if (data?.checkAdminCredentials) {
        console.log('navigating');
        
        localStorage.setItem('email', email)
        localStorage.setItem('pass', password)
  
        navigate('/dashboard', {
          replace: true
        })
      } else {
        // show a modal that email or password is incorrect.
        localStorage.clear()
      }
    }
  }

  useEffect(() => {
    document.title = 'PresentPo | Signin';
    if (localStorage.getItem('email') != null && localStorage.getItem('pass') != null) {
      checkCreds()
    }
  }, []);

  return (
    <Wrapper centered={true}>
      <TitleLogo />

      <div className="flex flex-col items-center gap-y-4 mt-20 w-3/6">
        <div className="w-full lg:w-3/5">
          <PTextfield placeholder="Email" value={email} valueSetter={setEmail} />
        </div>

        <div className="w-full lg:w-3/5">
          <PPassfield value={password} valueSetter={setPass} />
        </div>
      </div>

      <div className="w-3/5 lg:w-[236px] h-14 mt-16 flex justify-center items-center">
        {loading ? 
          <PropagateLoader color="#fff" /> :
          <PrimaryButton name="Sign in" onClick={checkCreds} />
        }
      </div>
    </Wrapper>
  )
}