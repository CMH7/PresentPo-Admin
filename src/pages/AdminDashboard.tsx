import Wrapper from "../components/Wrapper";
import logo from '../assets/logo.png';
import facultydark from '../assets/faculty-dark.png';
import facultywhite from '../assets/faculty-white.png';
import studentsIcon from '../assets/students-dark.png';
import studentsWhite from '../assets/studentsWhite.png';
import classdark from '../assets/classes.png';
import classwhite from '../assets/classwhite.png';
import subjectsdark from '../assets/subjects.png';
import subjectswhite from '../assets/subjectswhite.png';
import schedulesdark from '../assets/schedules.png';
import scheduleswhite from '../assets/schedulewhite.png';
import reports from '../assets/report-dark.png';
import reportswhite from '../assets/reportwhite.png'
import account1 from '../assets/account 1.png';
import logoutwhite from '../assets/logoutwhite.png';
import logout1 from '../assets/logout 1.png';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CChart } from '@coreui/react-chartjs'
import Admin from "../interfaces/Admin";
import { toast } from "react-toastify";
import ALL_LOGS from "../gql/GET/ALL/Log";
import ALL_STUDENTS from "../gql/GET/ALL/Students";
import ALL_ATTENDANCES from "../gql/GET/ALL/Attendance";
import Logs from "../interfaces/Logs";
import Attendance from "../interfaces/Attendance";
import dl from '../assets/dl.png'
import dldark from '../assets/dldark.png'
import { CSVLink } from "react-csv";
import { utcToZonedTime } from "date-fns-tz";
import { format, setYear } from "date-fns";
import { CFormCheck } from "@coreui/react";


export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false)
  const [time, setTime] = useState(new Date())
  const [adminn, setAdminn] = useState<Admin>()
  const [csvData, setCsvData] = useState<any[]>([])
  const [formattedDate2, setFormattedDate2] = useState('')
  const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1)
  const [curYear, setCurYear] = useState(2023)
  const [thisDay, setThisDay] = useState(true)
  const [monthly, setMonthly] = useState(false)
  const [yearly, setYearly] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])

  const navigate = useNavigate()

  const logsData = useQuery(ALL_LOGS, { variables: { filters: { } } })
  const students = useQuery(ALL_STUDENTS, { variables: { filters: {} } })
  const [getAllAttendances] = useLazyQuery(ALL_ATTENDANCES)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036]
  
  useEffect(() => {
    let datee = new Date();
    let timeZone = 'Asia/Singapore';
    let zonedDate = utcToZonedTime(datee, timeZone);
    let formattedDate = format(zonedDate, "EEE, dd MMM yyyy hh:mm aa");

    setFormattedDate2(formattedDate)

    let csv: any[] = []

    csv.push(['Changes in', 'Message', 'Hour', 'Minute', 'Shift', 'Month', 'Day', 'Year'])

    logsData.data?.getAllLogsWithFilters?.data?.forEach((log: Logs) => {
      csv.push([log.collection, log.message, log.date.hour % 12, log.date.minute, `${log.date.hour >= 12 ? 'PM' : 'AM'}`, months[log.date.month-1], log.date.day, log.date.year])
    })

    setCsvData(csv)
  }, [logsData.data])

  setInterval(() => {
    setTime(new Date())
  }, 60000)

  const logout = async () => {
    localStorage.clear()
    navigate('/')
  }

  function downloadimage() {
    let pic = document.getElementById("pic")
    //@ts-ignore
    html2canvas(pic, { allowTaint: true }).then(function (canvas) {

    var link = document.createElement("a")
    document.body.appendChild(link);
    link.download = `Present Late Monitor Chart PresentPo.jpg`
    link.href = canvas.toDataURL()
    link.target = '_blank'
    link.click()
    });
  }

  // checker of admin creds
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
      navigate('/', { replace: true })
    } else {
      //@ts-ignore
      setAdminn(JSON.parse(localStorage.getItem('admin')))

      getAllAttendances({ variables: { filters: { special: false, date: { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() } } } }).then((res) => {
        setChartData([res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Present').length, res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Late').length])
      })
    }
  }, [])

  useEffect(() => {
    if (thisDay) {
      getAllAttendances({ variables: { filters: { special: false, date: { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() } } } }).then((res) => {
        setChartData([res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Present').length, res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Late').length])
      })
    }
      
    if (monthly) {
      getAllAttendances({ variables: { filters: { special: false, date: { month: curMonth, year: curYear } } } }).then((res) => {
        setChartData([res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Present').length, res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Late').length])
      })
    }
    
    if (yearly) {
      getAllAttendances({ variables: { filters: { special: false, date: { year: curYear } } } }).then((res) => {
        setChartData([res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Present').length, res.data?.getAllAttendancesWithFilters?.data?.filter((att: Attendance) => att.label === 'Late').length])
      })
    }
  }, [thisDay, monthly, yearly, curMonth, curYear])

  return(
    <Wrapper centered={true}>
      {/* confirmation modal  */}
      {
        showModal ?
          <div className="absolute w-screen h-screen z-50 bg-black/50 backdrop-blur-md flex justify-center items-center poppins text-[16px]">
            <div className="w-[500px] h-[205px] bg-white rounded-[20px] flex flex-col items-center pt-[55px] relative">
              {/* message  */}
              <div className="w-[388px] overflow-hidden text-clip text-center">
                Are you sure you want to log out?
              </div>

              {/* divider  */}
              <div className="absolute bottom-[100px] w-[388px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

              {/* buttons  */}
              <div className="w-full flex justify-evenly absolute bottom-[50px]">
                {/* proceed button  */}
                <div onClick={logout} className="text-[#D80000] h-full w-2/4 cursor-pointer flex justify-center items-center hover:font-bold">
                  Logout
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

      {/* columns*/}
    	<div className="w-full h-full flex justify-center items-center p-[15px] gap-x-[10px] poppins ">

        {/* left */}
        <div className="w-[327px] h-full rounded-[20px] bg-white">

          {/* logo  */}
          <div className="flex mt-[50px] ml-[75px] w-[157px] h-[45px] mb-[28px]">
            <img src={logo} alt="Logo"/> 
          </div>

          {/* Line Break */}
          <div className="ml-[20px] w-[283px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

          {/* manage faculty  */}
          <Link to='/admindashboard/managefaculties'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={facultydark} alt="students-dark"/>
                <img className="hidden group-hover:block" src={facultywhite} alt="students-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Faculty
              </div>
            </div>
          </Link>

          {/* manage students  */}
          <Link to='/admindashboard/managestudents'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={studentsIcon} alt="students-dark"/>
                <img className="hidden group-hover:block" src={studentsWhite} alt="students-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Students
              </div>
            </div>
          </Link>

          {/* manage classes  */}
          <Link to='/admindashboard/manageclasses'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={classdark} alt="subjects-dark"/>
                <img className="hidden group-hover:block" src={classwhite} alt="subjects-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Classes
              </div>
            </div>
          </Link>

          {/* manage subjects */}
          <Link to='/admindashboard/managesubjects'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={subjectsdark} alt="subjects-dark"/>
                <img className="hidden group-hover:block" src={subjectswhite} alt="subjects-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Subjects
              </div>
            </div>
          </Link>

          {/* manage schedules */}
          <Link to='/admindashboard/manageschedules'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={schedulesdark} alt="subjects-dark"/>
                <img className="hidden group-hover:block" src={scheduleswhite} alt="subjects-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Schedules
              </div>
            </div>
          </Link>

          {/* reports */}
          <Link to='/admindashboard/reports/facultylist'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={reports} alt="subjects-dark"/>
                <img className="hidden group-hover:block" src={reportswhite} alt="subjects-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Reports
              </div>
            </div>
          </Link>

            {/* admin account */}
            <div className="flex flex-col">
              <Link to='/admindashboard/editadmin'>
                <div className="flex mt-[50px] ml-[128px] mb-[15px] w-[70px] h-[70px]">
                  <img src={account1} alt="account1"/>
                </div>
                <div className="flex poppins font-bold text-[16px] justify-center text-primary-2">
                  {adminn?.name.first} {adminn?.name.middle.charAt(0)} {adminn?.name.last} {adminn?.name.extension}
                </div> 
              </Link>

              <button onClick={() => setShowModal(true)} className="group flex justify-center items-center ml-[22px] mt-[30px] mr-[100px] bg-transparent hover:bg-primary-2 text-primary-2 hover:text-white font-semibold rounded-full border-[2px] border-[#072D5F] focus:outline-none focus:shadow-outline w-[283px] h-[55px]" type="submit">
                <div className="flex w-[20px] h-[20px] mr-[10px]">
                  <img className="group-hover:hidden" src={logout1} alt="logout1"/>
                  <img className="hidden group-hover:block" src={logoutwhite} alt="logoutwhite"/>
                </div>
                  Logout
							</button>
            </div>
        </div>
        
        <div className=" grow h-full flex flex-col gap-y-[10px] ">

          {/* top */}
          <div className="w-full h-fit flex items-center gap-x-[10px] ">
            <div className=" w-[1193px] h-[117px] rounded-[20px] bg-white flex items-center justify-center poppins font-extrabold text-[30px] text-primary-2 ">
              Dashboard
            </div>

            <div className=" w-[350px] h-[117px] bg-white rounded-[20px] flex items-center justify-center flex-col ">
              <div className=" poppins text-[16px] font-bold text-primary-2/50 ">
                {time.toLocaleString('default', { month: 'long' })} {time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}, {time.getUTCFullYear()}
              </div>

              <div className=" poppins text-[50px] text-primary-2 font-bold ">
                {time.getHours() % 12 < 10 && time.getHours() % 12 != 0 ? `0${time.getHours() % 12}` : time.getHours() % 12 == 0 ? 12 : time.getHours() % 12}:{time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()} {time.getHours() < 11 ? 'AM' : 'PM'}
              </div>
            </div>
          </div>

          {/* middle */}
          <div className=" w-full h-fit flex items-center gap-x-[10px] ">
            <div className=" bg-white rounded-[20px] w-[771px] h-[453px] flex items-center justify-center ">
              <CChart
                width={400}
                height={400}
                type="bar"
                data={{
                  labels: ['Male', 'Female', 'total'],
                  datasets: [
                    {
                      backgroundColor: ['#072d5f', '#1672ec', '#d4e7ff'],
                      data: [students.data?.getAllStudentsWithFilters?.data?.filter((sex: {sex: string}) => sex.sex === 'Male').length, students.data?.getAllStudentsWithFilters?.data?.filter((sex: {sex:string}) => sex.sex === 'Female').length, students.data?.getAllStudentsWithFilters?.data?.length],
                      hoverOffset: 0,
                      label: 'Sex ratio'
                    },
                  ],
                }}
              />
            </div>
            
            <div className=" bg-white rounded-[20px] w-[771px] h-[453px] flex justify-between ">
              <div id='pic' className=" h-full w-fit flex flex-col items-center gap-y-3 p-3 ">
                <div className=" text-[15px] text-primary-2 poppins font-semibold self-start ">
                  Present and Late Monitoring
                </div>
              
                <CChart
                  width={400}
                  height={400}
                  type="polarArea"
                  data={{
                    labels: ['Present', 'Late'],
                    datasets: [
                      {
                        backgroundColor: ['#072d5f', '#1672ec'],
                        data: chartData,
                      },
                    ],
                  }}
                />
              </div>


              <div className=" h-full w-2/6 flex flex-col items-center gap-y-3 p-3 ">
                <div onClick={() => downloadimage()} className=" hover:bg-primary-2 self-end transitio-all cursor-pointer group hover:text-white flex items-center justify-center gap-x-[10px] h-fit w-fit border border-primary-2 py-2 px-4 rounded-full text-primary-2 poppins font-semibold text-[13px] ">
                  <img className=" aspect-square w-[15px] h-auto group-hover:hidden" src={dldark} alt="dldark" />
                  <img className=" aspect-square w-[15px] h-auto hidden group-hover:block" src={dl} alt="dl" />

                  <div>
                    Download chart
                  </div>
                </div>
                <div className=" flex flex-col justify-center gap-y-[20px] h-1/2 w-full border-b border-primary-2 ">
                  <CFormCheck onClick={() => {
                    setThisDay(true)
                    setMonthly(false)
                    setYearly(false)
                  }} className="  text-primary-2 text-[15px] poppins font-semibold " label="  Today" checked={thisDay} />
                  <CFormCheck onClick={() => {
                    setThisDay(false)
                    setMonthly(true)
                    setYearly(false)
                  }} className="  text-primary-2 text-[15px] poppins font-semibold " label="  Monthly" checked={monthly} />
                  <CFormCheck onClick={() => {
                    setThisDay(false)
                    setMonthly(false)
                    setYearly(true)
                  }} className="  text-primary-2 text-[15px] poppins font-semibold " label="  Yearly" checked={yearly} />
                </div>

                <div aria-disabled={!monthly} className={` flex items-center justify-center gap-x-[10px] w-full ${!monthly ? 'hidden' : ''} transition-all `}>
                  <select onChange={e => setCurMonth(parseInt(e.target.value))} value={curMonth} className=" w-1/2 px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 border border-primary-2 cursor-pointer " name="months" id="monthss">
                      {
                        months.map((month: string, i: number) => {
                          return <option value={i + 1} key={`${month}${i}`}>{ month }</option>
                        })
                      }
                  </select>

                  <select onChange={e => setCurYear(parseInt(e.target.value))} value={curYear} className=" w-1/2 px-[10px] py-[5px] bg-white rounded-[5px] poppins font-bold text-[16px] text-primary-2 border border-primary-2 cursor-pointer " name="years" id="yearss">
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

          {/* bottom */}
          <div className="flex flex-col w-full grow px-[15px] py-[20px] rounded-[20px] gap-y-[15px] bg-white overflow-hidden">
            <div className=" w-full h-fit text-[20px] font-bold text-[#072D5F] flex items-center justify-between ">
              <div>
                Recent Activities
              </div>

              <CSVLink data={csvData} filename={`PresentPo Recent Activities-${formattedDate2}`} >
                <button className=" group text-[14px] border border-primary-2 py-2 px-4 rounded-full hover:bg-primary-2 transition-all flex items-center justify-center ">
                  <img className=" aspect-square w-[15px] h-auto group-hover:hidden" src={dldark} alt="dldark" />
                  <img className=" aspect-square w-[15px] h-auto hidden group-hover:block" src={dl} alt="dl" />

                  <div className=" ml-2 group-hover:text-white transition-all ">
                    Download recent activities
                  </div>
                </button>
              </CSVLink>
            </div>

            <div className=" w-full flex items-center h-fit rounded-[20px] text-[14px] font-semibold text-[#072D5F] bg-white">
              <div className=" w-[150px] shrink-0 ">Changes in</div>
              <div className=" grow ">Message</div>
              <div className=" w-[200px] shrink-0 ">Date</div>	
            </div>

            {/* Line Break */}
            <div className="flex items-center content-center w-[1515px] h-0.5 border-t-0 opacity-25 border-2 border-black">
            </div>

            <div className=" w-full h-fit rounded-b-[20px] overflow-auto ">
              {
                logsData.data?.getAllLogsWithFilters?.data?.map((log: Logs) => {
                  return log
                }).sort((logA: Logs, logB: Logs) => {
                  const dateA = new Date(logA.date.year, logA.date.month - 1, logA.date.day, logA.date.hour, logA.date.minute);
                  const dateB = new Date(logB.date.year, logB.date.month - 1, logB.date.day, logB.date.hour, logB.date.minute);
                  // @ts-ignore
                  return dateB - dateA;
                }).map((log: Logs) => {
                  return (
                    <div key={log.id} className="w-full h-fit px-[10px] flex items-center hover:bg-gray-300 select-none rounded-[10px] ">
                      <div className=" w-[150px] shrink-0 py-3 poppins text-[14px] text-primary-2 ">
                        {log.collection}
                      </div>
                      <div className=" grow py-3 poppins text-[14px] text-primary-2 ">
                        {log.message}
                      </div>
                      <div className=" w-[200px] shrink-0 py-3 poppins text-[14px] text-primary-2 ">
                        {log.date.hour % 12 != 0 && log.date.hour < 10 ? `0${log.date.hour % 12}` : log.date.hour % 12 == 0 ? 12 : log.date.hour % 12 < 10 ? `0${log.date.hour % 12}` : log.date.hour % 12}:{log.date.minute < 10 ? `0${log.date.minute}` : log.date.minute} {log.date.hour > 11 ? 'PM' : 'AM'} {log.date.month < 10 ? `0${log.date.month}` : log.date.month}/{log.date.day < 10 ? `0${log.date.day}` : log.date.day}/{log.date.year}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

			</div>
    </Wrapper>
  )
}
