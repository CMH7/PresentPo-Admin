import Wrapper from "../../components/Wrapper"
import chevronLeft from '../../assets/left-arrow 1.png'
import plusWhite from '../../assets/plus white.png'
import plusPrim from '../../assets/plus prim.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import editIcon from '../../assets/edit (1) 1.png'
import deleteIcon from '../../assets/delete 1.png'
import { Link, useNavigate } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import QueryResult from "../../components/QueryResult"
import { useEffect, useState } from "react"
import React from "react"

const ALL_SCHED = gql`
  query GetAllSchedulesWithFilters($filters: scheduleFilters!) {
    getAllSchedulesWithFilters(filters: $filters) {
      error
      message
      data {
        id
        subject
        schedule {
          day
          start_time {
            hour
            minute
            shift
          }
          end_time {
            hour
            minute
            shift
          }
        }
        faculty
        class
      }
    }
  }
`

const ALL_SUBJECT = gql`
    query GetAllStudentsWithFilters($filters: subjectFilters!) {
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

const ALL_FACULTY = gql`
  query GetAllFacultyWithFilters {
    getAllFacultyWithFilters {
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

const ALL_CLASS = gql`
  query GetAllClassWithFilters {
    getAllClassWithFilters {
      error
      message
      data {
        id
        strand
        year
        section
        semester
        students
      }
    }
  }
`

interface Schedule {
  id: string
  faculty: string
  class: string
  schedule: ScheduleSched
  subject: string
}

interface ScheduleSched {
  day: string
  start_time: Time
  end_time: Time
}

interface Time {
  minute: number
  hour: number
  shift: string
}

interface Subject {
    id: string
    code: string
    name: string
}

interface Faculty {
  id: string
  email: string
  password: string
  name: Name
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
  semester: number
  students: string[]
}

export default function ManageSchedules() {

  const [showModal, setShowModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [classes, setClasses] = useState<Classs[]>([])
  const [searchValue, setSearchValue] = useState('')

  const allSchedules = useQuery(ALL_SCHED, { variables: { filters: {} }})
  const allSubjects = useQuery(ALL_SUBJECT, { variables: { filters: {} } })
  const allFaculties = useQuery(ALL_FACULTY, { variables: { filters: {} } })
  const allClasses = useQuery(ALL_CLASS, { variables: { filters: {} } })

  const navigate = useNavigate()

  useEffect(() => {
    setSchedules(allSchedules.data?.getAllSchedulesWithFilters?.data)
    setSubjects(allSubjects.data?.getAllSubjectsWithFilters?.data)
    setFaculties(allFaculties.data?.getAllFacultyWithFilters?.data)
    setClasses(allClasses.data?.getAllClassWithFilters?.data)
  }, [allClasses.loading])

  useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      navigate('/', {replace: true})
    }
  }, [])

  const searchNow = (searchFor: string) => {
    setSubjects(allSubjects.data?.getAllStudentsWithFilters?.data)
    if (searchFor !== '' ) {
      setSubjects(studss => studss.filter((subject: Subject) => {
        let subjectData = `${subject.code} ${subject.name}`.toLowerCase()
        if ( subjectData.match(searchFor.toLowerCase()) ) {
          return subject
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
                Are you sure you want to delete this schedule <br /> <span className="italic">{ selectedSubject }</span> ?
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
              <img className="invert" src={chevronLeft} alt="chevron left" />
            </div>
          </Link>

          <div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
            Manage Schedules
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

          {/* add student button  */}
          <Link to='/admindashboard/manageschedules/addschedule' replace={true}>
            <div className="group w-[220px] h-[55px] flex items-center justify-center bg-primary-2 hover:bg-white transition-all rounded-[50px] cursor-pointer">
              {/* icon  */}
              <div className="aspect-square w-[20px] h-auto ">
                <img className="group-hover:hidden" src={plusWhite} alt="plus white icon" />
                <img className="hidden group-hover:block" src={plusPrim} alt="plus primary icon" />
              </div>

              {/* text  */}
              <div className="ml-[10px] poppins font-semibold text-[20px] text-white group-hover:text-primary-2 select-none">
                Add Schedule
              </div>
            </div>
          </Link>

          {/* filter dropdown  */}
          {/* <div className=" ml-[20px] w-[160px] h-[55px] border-[1px] border-white flex justify-center items-center rounded-[50px] cursor-pointer ">

            <div className=" poppins font-semibold text-[20px] text-white select-none ">
              Filter
            </div>
 
            <div className=" ml-[10px] aspect-square w-[20px] h-auto ">
              <img src={tri} alt="dropdown icon" />
            </div>
          </div> */}
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
          
          {/* subject name  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Subject Name
            </div>
          </div>

          {/* days */}
          <div className=" h-full w-[100px] flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Days
            </div>
          </div>
          
          {/* time */}
          <div className=" h-full w-[200px] flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Time
            </div>
          </div>
          
          {/* assigned faculty */}
          <div className=" h-full w-[300px] flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Assigned Faculty
            </div>
          </div>

          {/* strand */}
          <div className=" h-full w-[200px] flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Strand
            </div>
          </div>

          {/* grade and section */}
          <div className=" h-full grow flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Grade & Section
            </div>
          </div>
        </div>

        <div className={`w-full ${allSchedules.loading || allSubjects.loading || allFaculties.loading || allClasses.loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
          <QueryResult error={allSchedules.error || allSubjects.error || allFaculties.error || allClasses.error} loading={allSchedules.loading || allSubjects.loading || allFaculties.loading || allClasses.loading} data={allSchedules.data || allSubjects.data || allFaculties.data || allClasses.data}>
            {
              schedules?.map((schedule: Schedule, i: number) => {
                return (
                  <div key={schedule.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                    {/* No.  */}
                    <div className=" h-full w-[50px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { i + 1 }
                      </div>
                    </div>
                    
                    {/* subject name  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        {
                          subjects?.filter((subject: Subject) => {
                            return schedule.subject.match(subject.id) ||  schedule.subject.match(` ${subject.id}`)
                          })[0]?.name
                        }
                      </div>
                    </div>
                    
                    {/* days  */}
                    <div className=" h-full w-[100px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { schedule.schedule.day }
                      </div>
                    </div>

                    {/* time  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { schedule.schedule.start_time.hour % 12 < 10 ? `0${schedule.schedule.start_time.hour}` : schedule.schedule.start_time.hour % 12 }:{ schedule.schedule.start_time.minute }{ schedule.schedule.start_time.shift }-{ schedule.schedule.end_time.hour }:{ schedule.schedule.end_time.minute }{ schedule.schedule.end_time.shift }
                      </div>
                    </div>
                    
                    {/* assigned faculty  */}
                    <div className=" h-full w-[300px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        {
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.name.first
                        } {
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.name.middle
                        } {
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.name.last
                        } {
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.name.extension
                        }{
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.credentials !== '' ? ',' : ''
                        } {
                          faculties?.filter((faculty: Faculty) => {
                            return schedule.faculty.match(faculty.id) || schedule.faculty.match(` ${faculty.id}`)
                          })[0]?.credentials
                        }
                      </div>
                    </div>
                    
                    {/* strand  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        {
                          classes?.filter((classs: Classs) => {
                            return schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`)
                          })[0]?.strand
                        }
                      </div>
                    </div>
                    
                    {/* grade and section */}
                    <div className=" h-full grow flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        {
                          classes?.filter((classs: Classs) => {
                            return schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`)
                          })[0]?.year
                        }-{
                          classes?.filter((classs: Classs) => {
                            return schedule.class.match(classs.id) || schedule.class.match(` ${classs.id}`)
                          })[0]?.section
                        }
                      </div>
                    </div>

                    {/* actions  */}
                    <div className="absolute z-10 top-0 -right-[200px] group-hover:right-0 transition-all w-fit h-full flex items-center">
                      {/* edit subject  */}
                      <Link className="w-[55px] h-full" to={`/admindashboard/managesubjects/editsubject/${schedule.id}`}>
                        <div className=" w-full h-full bg-primary-1 flex items-center justify-center cursor-pointer ">
                          <div className="aspect-square w-[20px] h-auto">
                            <img src={editIcon} alt="edit icon" />
                          </div>
                        </div>
                      </Link>

                      {/* delete student  */}
                      <div onClick={() => {
                        setSelectedSubject(`(`)
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