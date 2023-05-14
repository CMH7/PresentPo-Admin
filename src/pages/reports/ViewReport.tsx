import { Link, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import chevronLeft from '../../assets/left-arrow 1.png'
import dl from '../../assets/dl.png'
import dldark from '../../assets/dldark.png'
import infoIcon from '../../assets/infoIcon.png'
import { useEffect, useState } from 'react'
import QueryResult from "../../components/QueryResult";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { CSVLink } from 'react-csv';

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
        students
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

const GET_SCHEDULE = gql`
  query GetAllSubjectsWithFilters($getScheduleId: ID!) {
    getSchedule(id: $getScheduleId) {
      error
      message
      data {
        id
        subject
        class
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
      }
    }
  }
`

const ALL_ATTENDANCES = gql`
  query GetAllSubjectsWithFilters($filters: attendanceFilters!) {
    getAllAttendancesWithFilters(filters: $filters) {
      error
      message
      data {
        id
        date {
          minute
          hour
          day
          month
          year
        }
        qr
        schedule
        special
        label
      }
    }
  }
`

const ALL_STUDENTS = gql`
  query ExampleQuery($filters: studentFilters!) {
    getAllStudentsWithFilters(filters: $filters) {
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
      }
    }
  }
`

interface Attendance {
  id: string
  date: attDate
  qr: string
  schedule: string
  special: boolean
  label: string
}

interface attDate {
  minute: number
  hour: number
  day: number
  month: number
  year: number
}

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
  schedule: sched
}

interface sched {
  day: string
  start_time: stime
  end_time: stime
}

interface stime {
  minute: number
  hour: number
  shift: string
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
  students: string[]
}

interface Student {
  id: string
  name: facName
}

interface customAttendance {
  day: number
  presents: string[]
  lates: string[]
  special: boolean
}

export default function ViewReport() {
  const { id, schedID } = useParams<{ id: string, schedID: string }>();
  const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1)
  const [curYear, setCurYear] = useState(new Date().getUTCFullYear())
  const [attendances, setAttendances] = useState<customAttendance[]>([])
  const [csvData, setCsvData] = useState<any[]>([])
  const [csvHeaders, setCsvHeaders] = useState<{label: string, key: string}[]>([])

  const faculty = useQuery(GET_FACULTY, { variables: { getFacultyId: id } })
  const classes = useQuery(ALL_CLASS, { variables: { filters: {} } })
  const subjects = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })
  const schedule = useQuery(GET_SCHEDULE, { variables: { getScheduleId: schedID } })
  const students = useQuery(ALL_STUDENTS, { variables: { filters: {} } })

  const [getAttendances, getAttObj] = useLazyQuery(ALL_ATTENDANCES)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036]
  
  useEffect(() => {
    
    getAttendances({ variables: { filters: { date: { month: curMonth, year: curYear } } } }).then(res => {
      let tempData = res?.data?.getAllAttendancesWithFilters?.data
      tempData = tempData?.filter((att: Attendance) => att.schedule.match(schedule.data?.getSchedule?.data?.id) || att.schedule.match(` ${schedule.data?.getSchedule?.data?.id}`))
      
      let pseudoAttendance: customAttendance[] = []
      tempData.forEach((attendance: Attendance) => {
        if (pseudoAttendance.filter((cAtt: customAttendance) => cAtt.day == attendance.date.day).length != 0) {
          pseudoAttendance.map((cA: customAttendance) => {
            if ( cA.day == attendance.date.day ) {
              if (attendance.special) {
                cA.special = true
              } else if ( attendance.label === 'Present' ) {
                cA.presents.push(attendance.qr)
              } else {
                cA.lates.push(attendance.qr)
              }
              return cA
            }
            return cA
          })
        } else {
          pseudoAttendance.push({ day: attendance.date.day, presents: attendance.label === 'Present' ? [attendance.qr] : [], lates: attendance.label === 'Late' ? [attendance.qr] : [], special: attendance.special })
        }
      })

      pseudoAttendance.sort((cA: customAttendance, cB: customAttendance) => {
        if (cA.day < cB.day) return -1
        if (cA.day > cB.day) return 1
        return 0
      })

      let csv: any[] = []
      csv.push(['Professor', `${faculty.data?.getFaculty?.data?.name?.first} ${faculty.data?.getFaculty?.data?.name?.middle?.charAt(0) !== '' ? `${faculty.data?.getFaculty?.data?.name?.middle?.charAt(0)}.` : ''} ${faculty.data?.getFaculty?.data?.name?.last}${faculty.data?.getFaculty?.data?.credentials !== '' ? `, ${faculty.data?.getFaculty?.data?.credentials}` : ''}`, '', '', '', '', '', '', '', `${months[curMonth - 1]}-${curYear}`])
      csv.push(['No.', 'Student name', 'Days', ...pseudoAttendance.map((pA: customAttendance, i: number) => { return '' }),  'Presents', 'Lates', 'Absents'])
      csv.push(['', '', ...pseudoAttendance.map((pA: customAttendance) => {return pA.day}), '', '', ''])
      setCsvHeaders([{ label: 'No.', key: '1' }, { label: 'Student name', key: '2' }, {label: 'Day', key: 'Day'}, { label: 'Presents', key: `${pseudoAttendance.length + 1}` }, { label: 'Lates', key: `${pseudoAttendance.length + 2}` }, { label: 'Absents', key: `${pseudoAttendance.length + 3}` }])
      
      classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.forEach((studentID: string, i: number) => { 
        const student = students.data?.getAllStudentsWithFilters?.data?.filter((student: Student) => studentID.match(student.id) || studentID.match(` ${student.id}`) || student.id.match(studentID) || student.id.match(` ${studentID}`))[0]
        csv.push([
          i + 1,
          `${student?.name?.first} ${student?.name?.middle !== '' ? `${student?.name?.middle.charAt(0)}.` : ''} ${student?.name?.last} ${student?.name?.extension}`,
          ...pseudoAttendance.map((pA: customAttendance) => { return pA.special ? '' : pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`) ? 'P' : pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`) ? 'L' : 'A' }), '',
          pseudoAttendance.filter((pA: customAttendance) => (pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`)) && !pA.special).length,
          pseudoAttendance.filter((pA: customAttendance) => (pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`)) && !pA.special).length,
          (pseudoAttendance.filter((pA: customAttendance) => !pA.special).length - (pseudoAttendance.filter((pA: customAttendance) => (pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`)) && !pA.special).length + pseudoAttendance.filter((pA: customAttendance) => (pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`)) && !pA.special).length))
        ])
      })
      
      setCsvData(csv)      
      setAttendances(pseudoAttendance)
    })
  }, [curMonth, curYear, classes.data, students.data, schedule.data])

  return (
    <Wrapper centered={true}>
      <div className=" w-full h-full px-[100px] flex flex-col items-center ">
        <QueryResult error={faculty.error || classes.error || subjects.error || schedule.error} loading={faculty.loading || classes.loading || subjects.loading || schedule.loading} data={faculty.data || classes.data || subjects.data || schedule.data} >
          {/* header  */}
          <div className=" w-full h-fit flex gap-x-[85px] pt-[40px] ">
            {/* back button  */}
            <div className="flex items-center h-fit">
              <Link to={`/admindashboard/reports/facultylist/${id}/subjectshandled`} replace={true}>
                <div className="aspect-square w-[25px] h-auto cursor-pointer">
                  <img src={chevronLeft} alt="chevron left" />
                </div>
              </Link>

              <div className="ml-[30px] poppins text-[40px] font-bold text-primary-2 select-none">
                Report
              </div>
            </div>

            {/* informations  */}
            <div className=" grow flex h-fit ">
              <div className=" flex flex-col gap-y-[10px] items-center ">
                {/* upper  */}
                <div className=" flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-white w-[500px] ">
                    Faculty Name: <span className=" ml-[15px] font-medium "> { faculty.data?.getFaculty?.data?.name?.first } { faculty.data?.getFaculty?.data?.name?.middle?.charAt(0) !== '' ? `${faculty.data?.getFaculty?.data?.name?.middle?.charAt(0)}.` : '' } { faculty.data?.getFaculty?.data?.name?.last }{ faculty.data?.getFaculty?.data?.credentials !== '' ? `, ${faculty.data?.getFaculty?.data?.credentials}` : '' } </span>
                  </div>

                  <div className=" poppins font-bold text-[20px] text-white w-[400px] ">
                    Subject: <span className=" ml-[15px] font-medium "> { `${subjects.data?.getAllSubjectsWithFilters?.data?.filter((subject: Subject) => schedule.data?.getSchedule?.data?.subject?.match(subject.id) || schedule.data?.getSchedule?.data?.subject?.match(` ${subject.id}`) )[0]?.name}` } </span>
                  </div>
                </div>
                
                {/* lower  */}
                <div className=" flex items-center ">
                  <div className=" poppins font-bold text-[20px] text-white w-[500px] ">
                    Class: <span className=" ml-[15px] font-medium "> { `${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.strand} ${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.year}-${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.section}` } </span>
                  </div>
                  
                  <div className=" poppins font-bold text-[20px] text-white w-[400px] ">
                    Schedule: <span className=" ml-[15px] font-medium "> { `${schedule.data?.getSchedule?.data?.schedule?.day} ${schedule.data?.getSchedule?.data?.schedule?.start_time?.hour}:${schedule.data?.getSchedule?.data?.schedule?.start_time?.minute}${schedule.data?.getSchedule?.data?.schedule?.start_time?.shift} - ${schedule.data?.getSchedule?.data?.schedule?.end_time?.hour}:${schedule.data?.getSchedule?.data?.schedule?.end_time?.minute}${schedule.data?.getSchedule?.data?.schedule?.end_time?.shift}` } </span>
                  </div>
                </div>
              </div>
            </div>

            {/* actions  */}
            <div className=" w-[188px] flex flex-col items-center gap-y-[22px] ">
              {/* export button  */}
              <CSVLink data={csvData} filename={`${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.strand} ${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.year}-${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.section} ${months[curMonth - 1]}-${curYear}`} className=" w-full h-[55px] rounded-[50px] bg-primary-2 flex items-center justify-center gap-x-[10px] group hover:bg-white cursor-pointer transition-all " >
                <img className="group-hover:hidden" src={dl} alt="dl" />
                <img className="hidden group-hover:block" src={dldark} alt="dldark" />

                <div className=" poppins text-white text-[20px] font-semibold select-none group-hover:text-primary-2 transition-all ">
                  Export
                </div>
              </CSVLink>

              <div className=" w-[117px] flex flex-col items-center gap-y-[7px] ">
                <div className=" poppins text-white text-[14px] font-bold ">
                  Filter by:
                </div>

                <div className=" flex gap-x-[10px] items-center ">
                  <select onChange={e => setCurMonth(parseInt(e.target.value))} value={curMonth} className=" w-[76px] px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 outline-0 cursor-pointer " name="months" id="monthss">
                    {
                      months.map((month: string, i: number) => {
                        return <option value={i + 1} key={`${month}${i}`}>{ month }</option>
                      })
                    }
                  </select>
                  
                  <select onChange={e => setCurYear(parseInt(e.target.value))} value={curYear} className=" w-[76px] px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 outline-0 cursor-pointer " name="years" id="yearss">
                    {
                      years.map((year: number) => {
                        return <option value={year} key={year}>{ year }</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full h-3/4 rounded-[20px] relative overflow-auto mt-[20px] ">
            {/* table headers  */}
            <div className=" sticky top-0 z-20 w-full h-[90px] bg-[#D5E7FF] flex items-center pl-[20px] ">
              {/* No.  */}
              <div className=" h-full w-[50px] shrink-0 flex items-center ">
                <div className=" poppins font-bold text-[20px] text-primary-2 ">
                  No.
                </div>
              </div>
              
              {/*  student name */}
              <div className=" h-full w-[300px] shrink-0 flex items-center ">
                <div className=" poppins font-bold text-[20px] text-primary-2 ">
                  Student name
                </div>
              </div>
              
              {/* dates  */}
              <div className=" h-full grow border-black flex flex-col ">
                <div className=" border-b border-x border-black w-full h-1/2 flex justify-center items-center poppins text-primary-2 text-[20px] font-bold ">
                    Day
                </div>
                <div className=" h-1/2 w-full border-r border-black flex items-center ">
                  {
                    attendances.map((cAttendance: customAttendance, i: number) => {
                      return (
                        <div key={`${cAttendance.day}${i}`} className={` w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] ${cAttendance.special ? 'bg-[#FFD3BA]' : ''} `}>
                          <div className=" poppins text-primary-2 text-[20px] font-bold ">
                            {cAttendance.day}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              {/* total */}
              <div className=" h-full w-[141px] flex flex-col items-center ">
                {/* title icon */}
                <div className=" w-full h-1/2 border-b border-black flex items-center justify-center gap-x-[43px] ">
                  <div className=" poppins font-bold text-primary-2 text-[20px] ">
                    Total
                  </div>

                  <div className=" aspect-square w-[15px] h-auto ">
                    <img className=" w-full h-full " src={infoIcon} alt="information icon" />
                  </div>
                </div>

                <div className=" w-full h-1/2 flex items-center justify-center ">
                  <div className=" w-1/3 h-full flex items-center justify-center poppins font-bold text-primary-2 text-[20px] ">
                    P
                  </div>
                  <div className=" w-1/3 h-full border-x border-black flex items-center justify-center poppins font-bold text-[#FFB800] text-[20px] ">
                    L
                  </div>
                  <div className=" w-1/3 h-full flex items-center justify-center poppins font-bold text-[#D80000] text-[20px] ">
                    A
                  </div>
                </div>
              </div>
            </div>
            
            {/* table body  */}
            <div className=' w-full h-fit mt-[2px] '>
              {
                classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.flatMap((studentID: string, i: number) => {
                  return students.data?.getAllStudentsWithFilters?.data?.flatMap((student: Student) => {
                    if (student.id.match(studentID) || student.id.match(` ${studentID}`) || studentID.match(student.id) || studentID.match(` ${student.id}`) ) {
                      return (
                        <div key={`${studentID}`} className=" w-full h-[44px] bg-white hover:bg-gray-200 mb-[2px] flex items-center pl-[20px] ">
                          {/* No.  */}
                          <div className=" h-full w-[50px] shrink-0 flex items-center ">
                            <div className=" poppins font-medium text-[16px] text-primary-2 ">
                              { i + 1 }
                            </div>
                          </div>
                          
                           {/* student name */}
                          <div className=" h-full w-[300px] shrink-0 flex items-center ">
                            <div className=" poppins font-medium text-[16px] text-primary-2 ">
                              { student.name.first } { student.name.middle !== '' ? `${student.name.middle.charAt(0)}.` : '' } { student.name.last } { student.name.extension }
                            </div>
                          </div>
                          
                          {/* dates  */}
                          <div className=" h-full grow border-r border-black flex items-center ">
                            {                              
                              attendances.map((cAttendance: customAttendance, i: number) => {
                                if (cAttendance.special) {
                                  return <div key={`${cAttendance.day}${i}`} className=" w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] bg-[#FFD3BA] " />
                                }
                                
                                if (cAttendance.presents.includes(student.id) || cAttendance.presents.includes(` ${student.id}`)) {
                                  return (
                                    <div key={`${cAttendance.day}${i}`} className=" w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] ">
                                      <div className=" poppins text-primary-2 text-[20px] font-bold ">
                                        P
                                      </div>
                                    </div>
                                  )
                                }
                                
                                if (cAttendance.lates.includes(student.id) || cAttendance.lates.includes(` ${student.id}`)) {
                                  return (
                                    <div key={`${cAttendance.day}${i}`} className=" w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] ">
                                      <div className=" poppins text-[#FFB800] text-[20px] font-bold ">
                                        L
                                      </div>
                                    </div>
                                  )
                                } 

                                return (
                                  <div key={`${cAttendance.day}${i}`} className=" w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] ">
                                    <div className=" poppins text-[#D80000] text-[20px] font-bold ">
                                      A
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
    
                          {/* total */}
                          <div className=" h-full w-[141px] flex flex-col items-center ">
                            <div className=" w-full h-[40px] flex items-center justify-center ">
                              <div className=" w-1/3 h-full flex items-center justify-center poppins font-bold text-primary-2 text-[20px] ">
                                {attendances.filter((cA: customAttendance) => (cA.presents.includes(student.id) || cA.presents.includes(` ${student.id}`)) && !cA.special ).length}
                              </div>
                              <div className=" w-1/3 h-full border-x border-black flex items-center justify-center poppins font-bold text-primary-2 text-[20px] ">
                                {attendances.filter((cA: customAttendance) => (cA.lates.includes(student.id) || cA.lates.includes(` ${student.id}`)) && !cA.special ).length}
                              </div>
                              <div className=" w-1/3 h-full flex items-center justify-center poppins font-bold text-primary-2 text-[20px] ">
                                { attendances.filter((cA: customAttendance) => !cA.special).length - ( attendances.filter((cA: customAttendance) => (cA.presents.includes(student.id) || cA.presents.includes(` ${student.id}`)) && !cA.special ).length + attendances.filter((cA: customAttendance) => (cA.lates.includes(student.id) || cA.lates.includes(` ${student.id}`)) && !cA.special ).length)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                })
              }

            </div>

          </div>
        </QueryResult>
      </div>
    </Wrapper>
  )
}