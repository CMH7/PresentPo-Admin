import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import chevronLeft from '../../assets/left-arrow 1.png'
import dl from '../../assets/dl.png'
import dldark from '../../assets/dldark.png'
import infoIcon from '../../assets/infoIcon.png'
import { useEffect, useState } from 'react'
import QueryResult from "../../components/QueryResult";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CSVLink } from 'react-csv';
import Student from "../../interfaces/Student";
import Classs from "../../interfaces/Classs";
import Subject from "../../interfaces/Subject";
import Attendance from "../../interfaces/Attendance";
import GET_FACULTY from "../../gql/GET/Faculty";
import ALL_CLASS from "../../gql/GET/ALL/Classs";
import ALL_SUBJECTS from "../../gql/GET/ALL/Subject";
import GET_SCHEDULE from "../../gql/GET/Schedule";
import ALL_STUDENTS from "../../gql/GET/ALL/Students";
import ALL_ATTENDANCES from "../../gql/GET/ALL/Attendance";
import { toast } from "react-toastify";

interface customAttendance {
  day: number
  month: number
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

  const faculty = useQuery(GET_FACULTY, { variables: { getFacultyId: id } })
  const classes = useQuery(ALL_CLASS, { variables: { filters: {} } })
  const subjects = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })
  const schedule = useQuery(GET_SCHEDULE, { variables: { getScheduleId: schedID } })
  const students = useQuery(ALL_STUDENTS, { variables: { filters: {} } })

  const [getAttendances, getAttObj] = useLazyQuery(ALL_ATTENDANCES)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036]
  
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

  useEffect(() => {
    
    getAttendances({ variables: { filters: { date: { month: [curMonth, curMonth + 1, curMonth + 2], year: curYear } } } }).then(res => {
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
          pseudoAttendance.push({ day: attendance.date.day, month: attendance.date.month, presents: attendance.label === 'Present' ? [attendance.qr] : [], lates: attendance.label === 'Late' ? [attendance.qr] : [], special: attendance.special })
        }
      })

      let pAtt1 = pseudoAttendance.filter((cA: customAttendance) => cA.month == curMonth)
      let pAtt2 = pseudoAttendance.filter((cA: customAttendance) => cA.month == curMonth + 1)
      let pAtt3 = pseudoAttendance.filter((cA: customAttendance) => cA.month == curMonth + 2)

      pAtt1.sort((cA: customAttendance, cB: customAttendance) => {
        if (cA.month < cB.month) return -1
        if (cA.month > cB.month) return 1
        return 0
      })
      pAtt2.sort((cA: customAttendance, cB: customAttendance) => {
        if (cA.month < cB.month) return -1
        if (cA.month > cB.month) return 1
        return 0
      })
      pAtt3.sort((cA: customAttendance, cB: customAttendance) => {
        if (cA.month < cB.month) return -1
        if (cA.month > cB.month) return 1
        return 0
      })

      pseudoAttendance = [...pAtt1, ...pAtt2, ...pAtt3]

      let csv: any[] = []
      csv.push(['Professor', `${faculty.data?.getFaculty?.data?.name?.first} ${faculty.data?.getFaculty?.data?.name?.middle?.charAt(0) !== '' ? `${faculty.data?.getFaculty?.data?.name?.middle?.charAt(0)}.` : ''} ${faculty.data?.getFaculty?.data?.name?.last}${faculty.data?.getFaculty?.data?.credentials !== '' ? `, ${faculty.data?.getFaculty?.data?.credentials}` : ''}`, '', '', '', '', '', '', '', '', '', '', `${months[curMonth - 1]}-${months[curMonth + 1]} ${curYear}`])
      csv.push(['No.', 'Last name', 'First name', 'Middle name', 'Extension name', 'Days', ...pseudoAttendance.map((pA: customAttendance, i: number) => { return '' }), 'Presents', 'Lates', 'Absents'])
      
      csv.push(['', '', '', '', '', ...pseudoAttendance.map((pA: customAttendance) => {return pA.month}), '', '', ''])
      csv.push(['', '', '', '', '', ...pseudoAttendance.map((pA: customAttendance) => {return pA.day}), '', '', ''])
      
      students.data?.getAllStudentsWithFilters?.data?.flatMap((student: Student, i: number) => {
        if (classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.includes(student.id) || classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.includes(` ${student.id}`)) {
          csv.push([
            i + 1,
            `${student?.name?.last}`,
            `${student?.name?.first}`,
            `${student?.name?.middle}`,
            `${student?.name?.extension}`,
            ...pseudoAttendance.map((pA: customAttendance) => { return pA.special ? 'S' : pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`) ? 'P' : pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`) ? 'L' : 'A' }),
            '',
            pseudoAttendance.filter((pA: customAttendance) => (pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`)) && !pA.special).length,
            pseudoAttendance.filter((pA: customAttendance) => (pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`)) && !pA.special).length,
            (pseudoAttendance.filter((pA: customAttendance) => !pA.special).length - (pseudoAttendance.filter((pA: customAttendance) => (pA.presents.includes(student?.id) || pA.presents.includes(` ${student?.id}`)) && !pA.special).length + pseudoAttendance.filter((pA: customAttendance) => (pA.lates.includes(student?.id) || pA.lates.includes(` ${student?.id}`)) && !pA.special).length))
          ])
        }
      })
      
      setCsvData(csv)      
      setAttendances(pseudoAttendance)
    })
  }, [curMonth, curYear, classes.data, students.data, schedule.data])

  return (
    <Wrapper centered={true}>
      <div className=" w-full h-full px-[100px] flex flex-col items-center ">
        <QueryResult error={faculty.error || classes.error || subjects.error || schedule.error || students.error} loading={faculty.loading || classes.loading || subjects.loading || schedule.loading || students.loading} data={faculty.data || classes.data || subjects.data || schedule.data || students.data} >
          {/* header  */}
          <div className=" w-full h-fit flex gap-x-[85px] pt-[40px] ">
            {/* back button  */}
            <div className="flex items-center h-fit">
              <Link to={`/admindashboard/reports/facultylist/${id}/subjectshandled`} replace={true}>
                <div className="aspect-square w-[25px] h-auto cursor-pointer">
                  <img className="invert" src={chevronLeft} alt="chevron left" />
                </div>
              </Link>

              <div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
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
              <CSVLink data={csvData} filename={`${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.strand} ${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.year}-${classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class?.match(classs.id) || schedule.data?.getSchedule?.data?.class?.match(` ${classs.id}`) )[0]?.section} ${months[curMonth - 1]}-${curYear}`} className=" border border-white w-full h-[55px] rounded-[50px] bg-primary-2 flex items-center justify-center gap-x-[10px] group hover:bg-white cursor-pointer transition-all " >
                <img className="group-hover:hidden" src={dl} alt="dl" />
                <img className="hidden group-hover:block" src={dldark} alt="dldark" />

                <div className=" poppins text-white text-[20px] font-semibold select-none group-hover:text-primary-2 transition-all ">
                  Export
                </div>
              </CSVLink>

              <div className=" w-[117px] flex flex-col items-end gap-y-[7px] ">
                <div className=" poppins text-white text-[14px] font-bold ">
                  Filter by:
                </div>

                <div className=" flex gap-x-[10px] items-center ">
                  <div className=" text-white poppins ">
                    From
                  </div>
                  <select onChange={e => setCurMonth(parseInt(e.target.value))} value={curMonth} className=" w-[76px] px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 outline-0 cursor-pointer " name="months" id="monthss">
                    {
                      months.map((month: string, i: number) => {
                        return <option value={i + 1} key={`${month}${i}`}>{ month }</option>
                      })
                    }
                  </select>
                  
                  <div className=" text-white poppins ">
                    To
                  </div>
                  <select disabled className=" w-[76px] px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 outline-0 cursor-pointer " name="months" id="monthss">
                    {
                      months.filter((month: string, i: number) => i + 1 == curMonth + 2).map((month: string, i: number) => {
                        return <option value={month}>{ month }</option>
                      })
                    }
                  </select>
                  
                  <div className=" ml-5 text-white poppins ">
                    Year
                  </div>
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
                        <div key={`${cAttendance.day}${i}`} className={` ${i == attendances.length - 1 ? 'border-r' : ''} w-[40px] h-full border-l border-black flex flex-col items-center justify-center ${cAttendance.special ? 'bg-[#FFD3BA]' : ''} `}>
                          <div className=" w-full border-b border-black flex items-center justify-center poppins text-primary-2 text-[13px] font-bold ">
                            {cAttendance.month}
                          </div>
                          <div className=" poppins text-primary-2 text-[15px] font-bold ">
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
                  <div className="  poppins font-bold text-primary-2 text-[20px] ">
                    Total
                  </div>

                  <div className=" aspect-square w-[15px] h-auto relative group bg-black ">
                    <img className=" w-full h-full " src={infoIcon} alt="information icon" />

                    <div className=" shadow-lg transition-all py-[8px] group-hover:opacity-100 opacity-0 absolute top-0 right-0 w-[205px] h-[78px] flex flex-col bg-white rounded-[10px] ">
                      <div className=" w-full flex items-center justify-center poppins text-[12px] text-primary-2 font-bold ">
                        Legend:
                      </div>

                      <div className=" w-full poppins text-[15px] font-bold flex justify-center items-center gap-x-[10px] ">
                        <div className=" text-primary-2 ">
                          P - Present
                        </div>

                        <div className=" text-[#D80000] ">
                          A <span className=" text-primary-2 "> - Absent</span>
                        </div>
                      </div>
                      
                      <div className=" w-full poppins text-[15px] font-bold flex justify-center items-center gap-x-[10px] ">
                        <div className=" text-[#FFB800] ">
                          L <span className=" text-primary-2 "> - Late</span>
                        </div>

                        <div className=" flex items-center gap-x-[5px] ">
                          <div className=" h-[15px] w-[15px] bg-[#FFD3BA] " />
                          <div className=" text-primary-2 ">
                            Special
                          </div>
                        </div>
                      </div>
                    </div>
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
                students.data?.getAllStudentsWithFilters?.data?.map((student: Student, i: number) => {
                  if (classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.includes(student.id) || classes.data?.getAllClassWithFilters?.data?.filter((classs: Classs) => schedule.data?.getSchedule?.data?.class.match(classs.id) || schedule.data?.getSchedule?.data?.class.match(` ${classs.id}`))[0]?.students?.includes(` ${student.id}`)) {
                    return (
                      <div key={`${student.id}`} className=" w-full h-[44px] bg-white hover:bg-gray-200 mb-[2px] flex items-center pl-[20px] ">
                        {/* No.  */}
                        <div className=" h-full w-[50px] shrink-0 flex items-center ">
                          <div className=" poppins font-medium text-[16px] text-primary-2 ">
                            { i }
                          </div>
                        </div>
                        
                          {/* student name */}
                        <div className=" h-full w-[300px] shrink-0 flex items-center ">
                          <div className=" poppins font-medium text-[16px] text-primary-2 ">
                            { student.name.last }, { student.name.first } {student.name.middle} { student.name.extension }
                          </div>
                        </div>
                        
                        {/* dates  */}
                        <div className=" h-full grow border-r border-black flex items-center ">
                          {                              
                            attendances.map((cAttendance: customAttendance, i: number) => {
                              if (cAttendance.special) {
                                return <div key={`${cAttendance.day}${i}`} className={` ${i == attendances.length - 1 ? 'border-r' : ''} w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px] bg-[#FFD3BA] `} />
                              }
                              
                              if (cAttendance.presents.includes(student.id) || cAttendance.presents.includes(` ${student.id}`)) {
                                return (
                                  <div key={`${cAttendance.day}${i}`} className={` ${i == attendances.length - 1 ? 'border-r' : ''} w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px]`} >
                                    <div className=" poppins text-primary-2 text-[20px] font-bold ">
                                      P
                                    </div>
                                  </div>
                                )
                              }
                              
                              if (cAttendance.lates.includes(student.id) || cAttendance.lates.includes(` ${student.id}`)) {
                                return (
                                  <div key={`${cAttendance.day}${i}`} className={` ${i == attendances.length - 1 ? 'border-r' : ''} w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px]`} >
                                    <div className=" poppins text-[#FFB800] text-[20px] font-bold ">
                                      L
                                    </div>
                                  </div>
                                )
                              } 

                              return (
                                <div key={`${cAttendance.day}${i}`} className={` ${i == attendances.length - 1 ? 'border-r' : ''} w-[40px] h-full border-l border-black flex flex-col items-center justify-center gap-y-[10px]`} >
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
              }
            </div>

          </div>
        </QueryResult>
      </div>
    </Wrapper>
  )
}