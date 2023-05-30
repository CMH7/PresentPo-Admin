import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import chevronLeft from '../../assets/left-arrow 1.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import { useEffect, useState } from 'react'
import QueryResult from "../../components/QueryResult";
import { useQuery } from "@apollo/client";
import Faculty from "../../interfaces/Faculty";
import ALL_FACULTY from "../../gql/GET/ALL/Faculty";
import { toast } from "react-toastify";

export default function FacultyList() {
  const [searchValue, setSearchValue] = useState('')
  const faculties = useQuery(ALL_FACULTY, { variables: { filters: {} } })
  const navigate = useNavigate()

  // checks if admin is empty
  useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      toast.error('Please Sign in first', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/', {replace: true})
    }
  }, [])

  return (
    <Wrapper centered={true}>
      <div className=" w-full h-full px-[100px] flex flex-col items-center ">
        {/* header  */}
        <div className=" w-full h-[150px] flex items-center justify-between ">
          {/* back button  */}
          <div className="flex items-center">
            <Link to='/admindashboard' replace={true}>
              <div className="aspect-square w-[25px] h-auto cursor-pointer">
                <img className="invert" src={chevronLeft} alt="chevron left" />
              </div>
            </Link>

            <div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
              Reports Faculty List
            </div>
          </div>

          {/* search bar  */}
          <div className=" w-fit h-auto pl-[165px]">
            <div className=" flex flex-row-reverse items-center w-[580px] h-[55px] bg-white rounded-[50px] overflow-hidden ">
              <input onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                setSearchValue(target.value)
                // searchNow(target.value)
              }} placeholder="Search" type='text' value={searchValue} className=" peer ml-[15px] w-full h-full focus-within:outline-none poppins text-[15px] text-[#898989] " />
              {/* search icon  */}
              <div className=" ml-[25px] aspect-square w-[20px] h-auto ">
                <img className="peer-focus-within:hidden" src={searchInac} alt="search icon" />
                <img className="hidden peer-focus-within:block" src={searchIcon} alt="search icon" />
              </div>
            </div>
          </div>
        </div>

        {/* table  */}
        <div className=" w-full h-3/4 rounded-[20px] relative overflow-auto ">
          {/* table headers  */}
          <div className=" sticky top-0 z-20 w-full h-[60px] bg-[#D5E7FF] flex items-center px-[20px] ">
            {/* No.  */}
            <div className=" h-full w-[50px] shrink-0 flex items-center ">
              <div className=" poppins font-bold text-[20px] text-primary-2 ">
                No.
              </div>
            </div>
            
            {/* Last Name  */}
            <div className=" h-full w-[200px] shrink-0 flex items-center ">
              <div className=" poppins font-bold text-[20px] text-primary-2 ">
                Last Name
              </div>
            </div>
            
            {/* First Name  */}
            <div className=" h-full w-[200px] shrink-0 flex items-center ">
              <div className=" poppins font-bold text-[20px] text-primary-2 ">
                First Name
              </div>
            </div>
            
            {/* Middle Name  */}
            <div className=" h-full w-[200px] shrink-0 flex items-center ">
              <div className=" poppins font-bold text-[20px] text-primary-2 ">
                Middle Name
              </div>
            </div>

            {/* credentials */}
            <div className=" h-full grow flex items-center ">
              <div className=" poppins font-bold text-[20px] text-primary-2 ">
                Credentials
              </div>
            </div>
          </div>

          <div className={`w-full ${faculties.loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
            <QueryResult error={faculties.error} loading={faculties.loading} data={faculties.data}>
              {
                faculties.data?.getAllFacultyWithFilters?.data?.map((faculty: Faculty, i: number) => {
                  return (
                    <div key={faculty.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                      {/* No.  */}
                      <div className=" h-full w-[50px] shrink-0 flex items-center ">
                        <div className=" poppins font-medium text-[16px] text-primary-2 ">
                          { i + 1 }
                        </div>
                      </div>
                      
                      {/* last name extension  */}
                      <div className=" h-full w-[200px] shrink-0 flex items-center ">
                        <div className=" poppins font-medium text-[16px] text-primary-2 ">
                          { faculty.name.last } { faculty.name.extension }
                        </div>
                      </div>
                      
                      {/* first name  */}
                      <div className=" h-full w-[200px] shrink-0 flex items-center ">
                        <div className=" poppins font-medium text-[16px] text-primary-2 ">
                          { faculty.name.first }
                        </div>
                      </div>
                      
                      {/* middle name  */}
                      <div className=" h-full w-[200px] shrink-0 flex items-center ">
                        <div className=" poppins font-medium text-[16px] text-primary-2 ">
                          { faculty.name.middle !== '' ? faculty.name.middle : '-' }
                        </div>
                      </div>
                      
                      {/* first name */}
                      <div className=" h-full grow flex items-center ">
                        <div className=" poppins font-medium text-[16px] text-primary-2 ">
                          { faculty.credentials !== '' ? faculty.credentials : '-' }
                        </div>
                      </div>

                      {/* actions  */}
                      <div className="absolute z-10 top-0 right-5 transition-all w-fit h-full flex items-center">
                        {/* edit subject  */}
                        <Link className="w-fit h-full flex items-center " to={`/admindashboard/reports/facultylist/${faculty.id}/subjectshandled`}>
                          <div className=" poppins text-[16px] text-primary-1 font-medium underline ">
                            View Subjects handled
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                })
              }
            </QueryResult>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}