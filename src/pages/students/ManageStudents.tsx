import Wrapper from "../../components/Wrapper"
import chevronLeft from '../../assets/left-arrow 1.png'
import plusWhite from '../../assets/plus white.png'
import plusPrim from '../../assets/plus prim.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client"
import QueryResult from "../../components/QueryResult"
import editIcon from '../../assets/edit (1) 1.png'
import deleteIcon from '../../assets/delete 1.png'
import { useEffect, useState } from "react"
import Student from "../../interfaces/Student"
import Classs from "../../interfaces/Classs"
import Schedule from "../../interfaces/Schedule"
import Subject from "../../interfaces/Subject"
import ALL_SUBJECTS from "../../gql/GET/ALL/Subject"
import ALL_SCHEDULE from "../../gql/GET/ALL/Schedule"
import ALL_CLASS from "../../gql/GET/ALL/Classs"
import ALL_STUDENTS from "../../gql/GET/ALL/Students"
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from "react-toastify"

export default function ManageStudents() {

  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [studss, setStudss] = useState<Student[]>([])
  const [classes, setClasses] = useState<Classs[]>([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const { error, loading, data } = useQuery(ALL_STUDENTS, { variables: { filters: {} } })
  const studClass = useQuery(ALL_CLASS, { variables: { filters: {} } })
  const scheds = useQuery(ALL_SCHEDULE, { variables: { filters: {} } })
  const subs = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })

  const datee = new Date();
  const timeZone = 'Asia/Singapore';

  const zonedDate = utcToZonedTime(datee, timeZone);
  console.log(zonedDate);
  
  const formattedDate = format(zonedDate, "EEE, dd MMM yyyy hh:mm aa");

  useEffect(() => {
    setStudss(data?.getAllStudentsWithFilters?.data)
    setClasses(studClass.data?.getAllClassWithFilters?.data)
  }, [subs.loading])

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

  const searchNow = (searchFor: string) => {
    setStudss(data?.getAllStudentsWithFilters?.data)
    if (searchFor !== '' ) {
      setStudss(studss => studss.filter((student: Student) => {
        let studentDData = `${student.username} ${student.sex} ${student.school_id} ${student.name.first} ${student.name.middle} ${student.name.last} ${student.name.extension}`.toLowerCase()
        if ( studentDData.match(searchFor.toLowerCase()) ) {
          return student
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
                Are you sure you want to delete this student <br /> <span className="italic">{ selectedStudent }</span> ?
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
            Manage Students
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
          <Link to='/admindashboard/managestudents/addstudent' replace={true}>
            <div className=" border border-white group w-[220px] h-[55px] flex items-center justify-center bg-primary-2 hover:bg-white transition-all rounded-[50px] cursor-pointer">
              {/* icon  */}
              <div className="aspect-square w-[20px] h-auto ">
                <img className="group-hover:hidden" src={plusWhite} alt="plus white icon" />
                <img className="hidden group-hover:block" src={plusPrim} alt="plus primary icon" />
              </div>

              {/* text  */}
              <div className="ml-[10px] poppins font-semibold text-[20px] text-white group-hover:text-primary-2 select-none">
                Add Student
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full h-fit flex items-center justify-between text-white text-[13px] px-[20px] ">
        <div>
          Latest data as of {formattedDate}
        </div>

        <div>
          Hover on students to see more information.
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
          
          {/* last name  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
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
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Middle Name
            </div>
          </div>

          {/* strand  */}
          <div className=" h-full w-[150px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2  ">
              Strand
            </div>
          </div>
          
          {/* year and section */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Year & Section
            </div>
          </div>
          
          {/* year and section */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Subjects Taken
            </div>
          </div>
          
          {/* sID */}
          <div className=" h-full grow flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              School ID/ Username
            </div>
          </div>


        </div>

        {/* table body  */}
        <div className={`w-full ${loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
          <QueryResult error={error || studClass.error || scheds.error || subs.error} loading={loading || studClass.loading || scheds.loading || subs.loading} data={data || studClass.data || scheds.data || subs.data}>

            {/* table contents  */}
            {
              studss?.map((stud: Student, i: number) => {
                return (
                  <div key={stud.id} className=" w-full h-[50px] hover:h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                    {/* No.  */}
                    <div className=" h-full w-[50px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { i + 1 }
                      </div>
                    </div>
                    
                    {/* last name  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { stud.name.last } { stud.name.extension }
                      </div>
                    </div>
                    
                    {/* first name  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { stud.name.first }
                      </div>
                    </div>
                    
                    {/* middle name  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { stud.name.middle }
                      </div>
                    </div>

                    {/* strand  */}
                    <div className=" h-full w-[150px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2  ">
                        {
                          classes?.filter((classs: Classs) => {
                            return classs?.students?.includes(` ${stud.id}`) || classs?.students?.includes(stud.id)
                          })[0]?.strand
                        }
                      </div>
                    </div>
                    
                    {/* year and section */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 flex ">
                        {
                          classes?.filter((classs: Classs) => {
                            return classs?.students?.includes(` ${stud.id}`) || classs?.students?.includes(stud.id)
                          })[0]?.year
                        }
                        -
                        {
                          classes?.filter((classs: Classs) => {
                            return classs?.students?.includes(` ${stud.id}`) || classs?.students?.includes(stud.id)
                          })[0]?.section
                        }
                      </div>
                    </div>
                    
                    {/* subjects taken */}
                    <div className=" h-full w-[200px] shrink-0 flex flex-col overflow-hidden ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        <ul className="list-disc list-inside">
                          {
                            classes?.flatMap((classs: Classs) => {
                              return classs?.students?.flatMap(studentID => {
                                if (studentID.match(stud.id) || stud.id.match(studentID)) {
                                  return scheds.data?.getAllSchedulesWithFilters?.data?.flatMap((schedule: Schedule) => {
                                    if (classs.id.match(schedule.class) || schedule.class.match(classs.id)) {
                                      return subs.data?.getAllSubjectsWithFilters?.data?.flatMap((subject: Subject) => {
                                        if (schedule.subject.match(subject.id) || subject.id.match(schedule.subject)) {
                                          return <li key={`${schedule.id}${i}`}> {subject.name} </li>;
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            })
                          }
                        </ul>
                      </div>
                    </div>
                    
                    {/* username */}
                    <div className=" h-full grow flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { stud.username }
                      </div>
                    </div>

                    {/* actions  */}
                    <div className="absolute z-10 top-0 -right-[200px] group-hover:right-0 transition-all w-fit h-full flex items-center">
                      {/* edit student  */}
                      <Link className="w-[55px] h-full" to={`/admindashboard/managestudents/editstudent/${stud.id}`}>
                        <div className=" w-full h-full bg-primary-1 flex items-center justify-center cursor-pointer ">
                          <div className="aspect-square w-[20px] h-auto">
                            <img src={editIcon} alt="edit icon" />
                          </div>
                        </div>
                      </Link>

                      {/* delete student  */}
                      <div onClick={() => {
                        setSelectedStudent(`(${stud.school_id}) ${stud.name.first} ${stud.name.middle.charAt(0)}${stud.name.middle !== '' ? '.' : ''} ${stud.name.last} ${stud.name.extension}`)
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