import { Link, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import chevronLeft from '../../assets/left-arrow 1.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import editIcon from '../../assets/edit (1) 1.png'
import deleteIcon from '../../assets/delete 1.png'
import { useState } from 'react'
import QueryResult from "../../components/QueryResult";
import { gql, useQuery } from "@apollo/client";

const GET_FACULTY = gql`
  query GetFaculty($getFacultyId: ID!) {
    getFaculty(id: $getFacultyId) {
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
        credentials
        email
        password
      }
    }
  }
`

const ALL_SCHEDULES_BY_FACULTY = gql`
  query GetFaculty($filters: scheduleFilters!) {
    getAllSchedulesWithFilters(filters: $filters) {
      error
      message
      data {
        id
        subject
        class
      }
    }
  }
`

const ALL_SUBJECTS = gql`
  query GetAllSubjectsWithFilters($filters: subjectFilters!) {
    getAllSubjectsWithFilters(filters: $filters) {
      error
      message
      data {
        id
        code
        name
      }
    }
  }
`

const ALL_CLASS = gql`
  query GetAllSubjectsWithFilters {
    getAllClassWithFilters {
      error
      message
      data {
        id
        strand
        year
        section
      }
    }
  }
`

interface Faculty {
  id: string
  name: facName
  email: string
  password: string
  credentials: string
}

interface facName {
  first: string
  middle: string
  last: string
  extension: string
}

interface Schedule {
  id: string
  subject: string
  class: string
}

interface Subject {
  id: string
  code: string
  name: string
}

interface Classs {
  id: string
  strand: string
  year: number
  section: string
  semester: number
}

export default function FacultySubjectsHandled() {
  const { id } = useParams<{ id: string }>();

  const [searchValue, setSearchValue] = useState('')

  const faculty = useQuery(GET_FACULTY, { variables: { getFacultyId: id } })
  const schedules = useQuery(ALL_SCHEDULES_BY_FACULTY, { variables: { filters: { faculty: id } } })
  const subjects = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })
  const classes = useQuery(ALL_CLASS, { variables: { filters: {} } })
  

  return (
    <Wrapper centered={true}>
      <div className=" w-full h-full px-[100px] flex flex-col items-center ">
        {/* header  */}
        <div className=" w-full h-[150px] flex items-center justify-between ">
          {/* back button  */}
          <div className="flex items-center">
            <Link to='/admindashboard/reports/facultylist' replace={true}>
              <div className="aspect-square w-[25px] h-auto cursor-pointer">
                <img src={chevronLeft} alt="chevron left" />
              </div>
            </Link>

            <div className="ml-[30px] poppins text-[40px] font-bold text-primary-2 select-none">
              Subjects handled
            </div>
          </div>
        </div>

        <hr className="w-full border-white/50 border-[1px] " />

        <div className=" w-full h-full flex flex-col items-center ">
          <QueryResult error={ faculty.error || schedules.error || subjects.error || classes.error } loading={ faculty.loading || schedules.loading || subjects.loading || classes.loading } data={ faculty.data || schedules.data || subjects.data || classes.data } >
            <div className=" w-full h-[150px] flex items-center justify-between pl-[30px] ">
              {/* information header  */}
              <div className=" flex flex-col gap-y-[10px] items-center ">
                {/* upper  */}
                <div className=" flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-primary-2 w-[310px] ">
                    Last Name: <span className=" ml-[15px] font-medium "> { faculty.data?.getFaculty?.data?.name?.last } </span>
                  </div>
                  
                  <div className=" poppins font-bold text-[20px] text-primary-2 w-[310px] ">
                    Middle Name: <span className=" ml-[15px] font-medium "> { faculty.data?.getFaculty?.data?.name?.middle !== '' ? faculty.data?.getFaculty?.data?.name?.middle : '---' } </span>
                  </div>
                </div>
                
                {/* lower  */}
                <div className=" flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-primary-2 w-[310px] ">
                    First Name: <span className=" ml-[15px] font-medium "> { faculty.data?.getFaculty?.data?.name?.first } </span>
                  </div>
                  
                  <div className=" poppins font-bold text-[20px] text-primary-2 w-[310px] ">
                    Credentials: <span className=" ml-[15px] font-medium "> { faculty.data?.getFaculty?.data?.credentials !== '' ? faculty.data?.getFaculty?.data?.credentials : '---' } </span>
                  </div>
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

            <div className=" w-full h-3/4 rounded-[20px] relative overflow-auto ">
              {/* table headers  */}
              <div className=" sticky top-0 z-20 w-full h-[60px] bg-[#D5E7FF] flex items-center px-[20px] ">
                {/* No.  */}
                <div className=" h-full w-[50px] shrink-0 flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-primary-2 ">
                    No.
                  </div>
                </div>
                
                {/* subject  */}
                <div className=" h-full w-[200px] shrink-0 flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-primary-2 ">
                    Subject
                  </div>
                </div>

                {/* class handled */}
                <div className=" h-full grow flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-primary-2 ">
                    Class handled
                  </div>
                </div>
              </div>

              <div className={`w-full ${faculty.loading || schedules.loading || subjects.loading || classes.loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
                {
                  schedules.data?.getAllSchedulesWithFilters?.data?.map((schedule: Schedule, i: number) => {
                    return (
                      <div key={schedule.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                        {/* No.  */}
                        <div className=" h-full w-[50px] shrink-0 flex items-center ">
                          <div className=" poppins font-medium text-[16px] text-primary-2 ">
                            { i + 1 }
                          </div>
                        </div>
                        
                        {/* subject  */}
                        <div className=" h-full w-[200px] shrink-0 flex items-center ">
                          <div className=" poppins font-medium text-[16px] text-primary-2 ">
                            {
                              subjects.data?.getAllSubjectsWithFilters?.data?.filter((subject: Subject) => schedule.subject.match(subject.id) || schedule.subject.match(` ${subject.id}`))[0]?.name
                            }
                          </div>
                        </div>
                        
                        {/* class handled */}
                        <div className=" h-full grow flex items-center ">
                          <div className=" poppins font-medium text-[16px] text-primary-2 ">
                            {
                              `${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`))[0]?.strand} ${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`))[0]?.year}-${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`))[0]?.section}`
                            }
                          </div>
                        </div>

                        {/* actions  */}
                        <div className="absolute z-10 top-0 right-5 transition-all w-fit h-full flex items-center">
                          {/* edit subject  */}
                          <Link className="w-fit h-full flex items-center " to={`/admindashboard/reports/facultylist/${id}/subjectshandled/${schedule.id}/report`}>
                            <div className=" poppins text-[16px] text-primary-1 font-medium underline ">
                              View Attendance
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </QueryResult>
        </div>


      </div>
    </Wrapper>
  )
}