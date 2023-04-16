import TitleLogo from "../components/TitleLogo";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from 'react'
import PTextfield from "../components/forms/PTextfield";
import PPassfield from "../components/forms/PPassfield";
import { useNavigate } from 'react-router-dom'
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function Signin() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const admin = {
    email: 'dea',
    pass: 'dea'
  }

  const checkCreds = () => {
    if (email === admin.email && pass === admin.pass) {
      // navigate to '/AdminPanel'
      localStorage.setItem('email', email)
      localStorage.setItem('pass', pass)

      navigate('/students', {
        replace: true
      })
    } else {
      // show a modal that email or password is incorrect.
      localStorage.clear()
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
          <PPassfield value={pass} valueSetter={setPass} />
        </div>
      </div>

      <div className="w-3/5 lg:w-[236px] h-14 mt-16">      
        <PrimaryButton name="Sign in" onClick={checkCreds} />
      </div>

    </Wrapper>
  )
}