import Wrapper from "../../components/Wrapper"
import chevronLeft from '../../assets/left-arrow 1.png'
import plusWhite from '../../assets/plus white.png'
import plusPrim from '../../assets/plus prim.png'
import tri from '../../assets/down 1.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import { Link } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import QueryResult from "../../components/QueryResult"
import editIcon from '../../assets/edit (1) 1.png'
import deleteIcon from '../../assets/delete 1.png'
import { useEffect, useState } from "react"

const ALL_FACULTIES = gql`
  query getAllFacultyWithFilters($filters: facultyFilters) {
    getAllFacultyWithFilters(filters: $filters) {
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
      }
    }
  }
`

const ALL_CLASSES = gql`
  query GetAllClassWithFilters($filters: classFilters) {
    getAllClassWithFilters(filters: $filters) {
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

const ALL_SCHEDS = gql`
  query GetAllSchedulesWithFilters($filters: scheduleFilters!) {
    getAllSchedulesWithFilters(filters: $filters) {
      data {
        id
        subject
        class
        faculty
      }
    }
  }
`

const ALL_SUBJECTS = gql`
  query GetAllSubjectsWithFilters($filters: subjectFilters!) {
    getAllSubjectsWithFilters(filters: $filters) {
      data {
        name
        id
        code
      }
    }
  }
`

interface Faculty {
  id: string
  name: Name
  email: string
  credentials: string
}

interface Name {
  first: string
  middle: string
  last: string
  extension: string
}

interface Classs {
  id: string
  strand: string
  year: number
  section: string
}

interface Schedule {
  id: string
  subject: string
  class: string
  faculty: string
}

interface Subject {
  id: string
  code: string
  name: string
}

export default function ManageFaculties() {

  const [showModal, setShowModal] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [searchValue, setSearchValue] = useState('')

  const { error, loading, data } = useQuery(ALL_FACULTIES, { variables: { filters: {} } })
  const classes = useQuery(ALL_CLASSES, { variables: { filters: {} } })
  const schedules = useQuery(ALL_SCHEDS, { variables: { filters: {} } })
  const subjects = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })

  useEffect(() => {
    setFaculties(data?.getAllFacultyWithFilters?.data)       
  }, [subjects.loading])

  const searchNow = (searchFor: string) => {
    setFaculties(data?.getAllFacultyWithFilters?.data)
    if (searchFor !== '' ) {
      setFaculties(faculties => faculties.filter((faculty: Faculty) => {
        let facultyData = `${faculty.email} ${faculty.name.first} ${faculty.name.middle} ${faculty.name.last} ${faculty.name.extension}`.toLowerCase()
        if ( facultyData.match(searchFor.toLowerCase()) ) {
          return faculty
        }
      }))
    }
  }

  return (
    <Wrapper centerX={true} klass="px-[100px] relative ">
      {/* confirmation modal  */}
      {
        showModal ?
          <div className="absolute w-screen h-screen z-50 bg-black/50 backdrop-blur-md flex justify-center items-center poppins text-[16px]">
            <div className="w-[500px] h-[205px] bg-white rounded-[20px] flex flex-col items-center pt-[55px] relative">
              {/* message  */}
              <div className="w-[388px] overflow-hidden text-clip text-center">
                Are you sure you want to delete this faculty <br /> <span className="italic">{ selectedFaculty }</span> ?
              </div>

              {/* divider  */}
              <div className="absolute bottom-[46px] w-[388px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

              {/* buttons  */}
              <div className="w-full flex justify-evenly absolute bottom-[11px]">
                {/* proceed button  */}
                <div onClick={() => { }} className="text-[#D80000] h-full w-2/4 cursor-pointer flex justify-center items-center hover:font-bold">
                  Delete
                </div>

                {/* cancel button  */}
                <div onClick={() => setShowModal(false)} className="text-primary-2 h-full w-2/4 cursor-pointer flex justify-center items-center hover:font-bold">
                  Cancel
                </div>
              </div>
            </div>
          </div>
          :
          <></>
      }

      {/* navs and actions */}
      <div className="w-full h-[150px] flex items-center">
        {/* back button  */}
        <div className="flex items-center">
          <Link to='/admindashboard' replace={true}>
            <div className="aspect-square w-[25px] h-auto cursor-pointer">
              <img src={chevronLeft} alt="chevron left" />
            </div>
          </Link>

          <div className="ml-[30px] poppins text-[40px] font-bold text-primary-2 select-none">
            Manage Faculties
          </div>
        </div>

        {/* search bar  */}
        <div className="grow pl-[165px]">
          <div className=" flex flex-row-reverse items-center w-[580px] h-[55px] bg-white rounded-[50px] overflow-hidden ">
            <input onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              setSearchValue(target.value)
              searchNow(target.value)
            }} placeholder="Search" type='text' value={searchValue} className=" peer ml-[15px] w-full h-full focus-within:outline-none poppins text-[15px] text-[#898989] " />
            {/* search icon  */}
            <div className=" ml-[25px] aspect-square w-[20px] h-auto ">
              <img className="peer-focus-within:hidden" src={searchInac} alt="search icon" />
              <img className="hidden peer-focus-within:block" src={searchIcon} alt="search icon" />
            </div>
          </div>
        </div>

        {/* action buttons  */}
        <div className="flex">

          {/* add faculty button  */}
          <Link to='/admindashboard/managestudents/addstudent' replace={true}>
            <div className="group w-[220px] h-[55px] flex items-center justify-center bg-primary-2 hover:bg-white transition-all rounded-[50px] cursor-pointer">
              {/* icon  */}
              <div className="aspect-square w-[20px] h-auto ">
                <img className="group-hover:hidden" src={plusWhite} alt="plus white icon" />
                <img className="hidden group-hover:block" src={plusPrim} alt="plus primary icon" />
              </div>

              {/* text  */}
              <div className="ml-[10px] poppins font-semibold text-[20px] text-white group-hover:text-primary-2 select-none">
                Add Faculty
              </div>
            </div>
          </Link>

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
          
          {/* credentials  */}
          <div className=" h-full w-[150px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Credentials
            </div>
          </div>
          
          {/* last name  */}
          <div className=" h-full w-[170px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Last Name
            </div>
          </div>
          
          {/* first name  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              First Name
            </div>
          </div>
          
          {/* middle name  */}
          <div className=" h-full w-[170px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Middle Name
            </div>
          </div>

          {/* subject handled  */}
          <div className=" h-full w-[230px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2  ">
              Subjects Handled
            </div>
          </div>
          
          {/* classes handled */}
          <div className=" h-full w-[230px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Classes Handled
            </div>
          </div>
          
          {/* email */}
          <div className=" h-full grow flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Email
            </div>
          </div>


        </div>
        <div className={`w-full ${loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
          <QueryResult error={error || classes.error || schedules.error || subjects.error} loading={loading || classes.loading || schedules.loading || subjects.loading} data={data || classes.data || schedules.data || subjects.data}>
            {
              faculties?.map((faculty: Faculty, fi: number) => {
                return (
                  <div key={faculty.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                    {/* No.  */}
                    <div className=" h-full w-[50px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { fi + 1 }
                      </div>
                    </div>
                    
                    {/* credentials  */}
                    <div className=" h-full w-[150px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { faculty.credentials }
                      </div>
                    </div>
                    
                    {/* last name  */}
                    <div className=" h-full w-[170px] shrink-0 flex items-center ">
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
                    <div className=" h-full w-[170px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { faculty.name.middle ? faculty.name.middle : '-' }
                      </div>
                    </div>

                    {/* subjects handled  */}
                    <div className=" h-full w-[230px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2  ">
                        <ul className="list-disc list-inside">
                          {
                            schedules.data?.getAllSchedulesWithFilters?.data?.flatMap((schedule: Schedule) => {
                              if (faculty.id.match(schedule.faculty) || schedule.faculty.match(faculty.id)) {
                                return subjects.data?.getAllSubjectsWithFilters?.data?.flatMap((subject: Subject) => {
                                  if (schedule.subject.match(subject.id) || subject.id.match(schedule.subject)) {
                                    return <li key={`${faculty.id}${schedule.id}${subject.id}${fi}`} >({subject.code}) { subject.name } </li>
                                  }
                                })
                              }
                            })
                          }
                        </ul>
                      </div>
                    </div>
                    
                    {/* classes handled */}
                    <div className=" h-full w-[230px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        <ul className="list-disc list-inside">
                          {
                            schedules.data?.getAllSchedulesWithFilters?.data?.flatMap((schedule: Schedule) => {
                              if (faculty.id.match(schedule.faculty) || schedule.faculty.match(faculty.id)) {
                                return classes.data?.getAllClassWithFilters?.data?.flatMap((classs: Classs) => {
                                  if (schedule.class.match(classs.id) || classs.id.match(schedule.class)) {
                                    return <li key={`${faculty.id}${schedule.id}${classs.id}${fi}`} > {classs.strand} {classs.year}-{classs.section} </li>
                                  }
                                })
                              }
                            })
                          }
                        </ul>
                      </div>
                    </div>
                    
                    {/* email */}
                    <div className=" h-full grow flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { faculty.email }
                      </div>
                    </div>

                    {/* actions  */}
                    <div className="absolute z-10 top-0 -right-[200px] group-hover:right-0 transition-all w-fit h-full flex items-center">
                      {/* edit student  */}
                      <Link className="w-[55px] h-full" to={`/admindashboard/managefaculties/editfaculty/${faculty.id}`}>
                        <div className=" w-full h-full bg-primary-1 flex items-center justify-center cursor-pointer ">
                          <div className="aspect-square w-[20px] h-auto">
                            <img src={editIcon} alt="edit icon" />
                          </div>
                        </div>
                      </Link>

                      {/* delete student  */}
                      <div onClick={() => {
                        setSelectedFaculty(`${faculty.name.first} ${faculty.name.middle.charAt(0)}${faculty.name.middle !== '' ? '.' : ''} ${faculty.name.last} ${faculty.name.extension}`)
                        setShowModal(true)
                      }} className=" w-[55px] h-full bg-[#D80000] flex items-center justify-center cursor-pointer ">
                        <div className="aspect-square w-[20px] h-auto">
                          <img src={deleteIcon} alt="delete icon" />
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })
            }
          </QueryResult>
        </div>
      </div>
    </Wrapper>
  )
}