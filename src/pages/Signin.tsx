import TitleLogo from "../components/TitleLogo";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from 'react'
import PTextfield from "../components/forms/PTextfield";
import PPassfield from "../components/forms/PPassfield";
import { Link } from 'react-router-dom'
import PrimaryButton from "../components/buttons/PrimaryButton";
import { gql, useLazyQuery } from "@apollo/client";
import { PropagateLoader } from "react-spinners"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CHECK_ADMIN_CREDENTIALS = gql`
  query GetAllAdminWithFilters($filters: adminFilters) {
    getAllAdminWithFilters(filters: $filters) {
      error
      message
      data {
        id
        name {
          first
          middle
          last
          extension
        }
        email
        password
      }
    }
  }
`

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const [getAllAdminWithFilters, { loading, data }] = useLazyQuery(CHECK_ADMIN_CREDENTIALS)

  const checkCreds = async () => {    
    if (email !== '' && password !== '') {
      getAllAdminWithFilters({ variables: { filters: { email, password } } }).then(res => {
        if (res.data != null && res.data?.getAllAdminWithFilters?.data?.length > 0) {        
          toast.success('Valid credentials', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          localStorage.setItem('admin', JSON.stringify(res.data?.getAllAdminWithFilters?.data[0]))
        } else {
          // show a modal that email or password is incorrect.
          toast.warn('Incorrect username or password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log('error');
          localStorage.clear()
        }
      })
    } else {
      toast.warn('Username or password is invalid. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    document.title = 'PresentPo | Signin';
    localStorage.clear()
  }, []);

  return (
    <Wrapper centered={true}>
      {/* Same as */}
      {
        loading ?
          <PropagateLoader color="#fff" />
          :
          data == null || data?.getAllAdminWithFilters?.data?.length == 0 ?
            <>
              <TitleLogo />

              <div className="flex flex-col items-center gap-y-4 mt-20 w-3/6">
                <div className="w-full lg:w-3/5">
                  <PTextfield disabled={false} placeholder="Username" value={email} valueSetter={setEmail} />
                </div>
                <div className="w-full lg:w-3/5">
                  <PPassfield disabled={false} value={password} valueSetter={setPass} />
                </div>
              </div>

              <div className="w-3/5 lg:w-[236px] h-14 mt-16">
                <PrimaryButton name={`${loading ? 'loading...' : 'Sign in'}`} onClick={checkCreds} />
              </div>
            </>
            :
            <>
              <div className="poppins text-4xl lg:text-5xl text-white font-semibold select-none">
                Welcome back, {data?.getAllAdminWithFilters?.data[0]?.name?.first} {data?.getAllAdminWithFilters?.data[0]?.name?.middle} {data?.getAllAdminWithFilters?.data[0]?.name?.last} {data?.getAllAdminWithFilters?.data[0]?.name?.extension}
              </div>
              <Link to='/admindashboard' replace={true}>
                <div className="w-3/5 lg:w-[236px] h-14 mt-14">
                  <PrimaryButton name="Next" />
                </div>
              </Link>
            </>
      }
    </Wrapper>
  )
}