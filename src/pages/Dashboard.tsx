import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const admin = {
    email: 'cm',
    pass: 'cm'
  }

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Dashboard';
    if (localStorage.getItem('email') != null && localStorage.getItem('pass') != null) {
      if (admin.email !== localStorage.getItem('email') && admin.pass !== localStorage.getItem('pass')) {
        navigate('/', {
          replace: true
        })
      }
    } else {
      navigate('/', {
        replace: true
      })
    }
  }, [])

  return (
    <Wrapper>
      <h1>Admin Panel</h1>
    </Wrapper>
  )
}