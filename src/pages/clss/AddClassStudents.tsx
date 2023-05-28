import Wrapper from "../../components/Wrapper"
import chevronLeft from '../../assets/left-arrow 1.png'
import plusWhite from '../../assets/plus white.png'
import searchIcon from '../../assets/search 1.png'
import searchInac from '../../assets/searchInactive.png'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import QueryResult from "../../components/QueryResult"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import GET_CLASS from "../../gql/GET/Classs"
import Student from "../../interfaces/Student"
import ALL_STUDENTS from "../../gql/GET/ALL/Students"
import EDIT_CLASSS from "../../gql/SET/EDIT/Classs"
import ALL_CLASS from "../../gql/GET/ALL/Classs"
import Classs from "../../interfaces/Classs"


export default function AddClassStudents() {
  const { id } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [studID, setStudID] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [adding, setAdding] = useState(false)
  const navigate = useNavigate()

  const clasdata = useQuery(GET_CLASS, { variables: { getClassId: id } })
  const classes = useQuery(ALL_CLASS, { variables: { filters: {} }})
  const studClass = useQuery(ALL_STUDENTS, { variables: { filters: {} } })
  const [addStudent] = useMutation(EDIT_CLASSS, {
    onCompleted: (data) => {
			toast.success(`${data?.updateClass?.message}. Student added.`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setAdding(false)
			navigate(`/admindashboard/manageclasses/${id}/manageclassstudents`, {replace: true})
		},
		onError: (e) => {
			toast.error(`${e}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setAdding(false)
		}
  })

  useEffect(() => {
    setStudents(studClass.data?.getAllStudentsWithFilters?.data)
  }, [studClass.loading])

  const searchNow = (searchFor: string) => {
    setStudents(studClass.data?.getAllStudentsWithFilters?.data)
    if (searchFor !== '' ) {
      setStudents(studss => studss.filter((student: Student) => {
        let studentDData = `${student.username} ${student.sex} ${student.school_id} ${student.name.first} ${student.name.middle} ${student.name.last} ${student.name.extension}`.toLowerCase()
        if ( studentDData.match(searchFor.toLowerCase()) ) {
          return student
        }
      }))
    }
  }

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
    <Wrapper centerX={true} klass="px-[100px] relative ">
      {/* confirmation modal  */}
      {
        showModal ?
          <div className="absolute w-screen h-screen z-50 bg-black/50 backdrop-blur-md flex justify-center items-center poppins text-[16px]">
            <div className="w-[500px] h-[205px] bg-white rounded-[20px] flex flex-col items-center pt-[55px] relative">
              {/* message  */}
              <div className="w-[388px] overflow-hidden text-clip text-center">
                Are you sure you want to add this student <br /> <span className="italic">{ selectedStudent }</span> ?
              </div>

              {/* divider  */}
              <div className="absolute bottom-[46px] w-[388px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

              {/* buttons  */}
              <div className="w-full flex justify-evenly absolute bottom-[11px]">
                {/* proceed button  */}
                <div onClick={() => { 
                  addStudent({variables: {updateClassId: id, updatedClass: { students: [...clasdata.data?.getClass?.data?.students, studID] }}})
                  setAdding(true)
                }} className="text-emerald-500 h-full w-2/4 cursor-pointer flex justify-center items-center hover:font-bold">
                  {
                    adding ? 
                      <div>
                        adding...
                      </div>
                      :
                      <div>
                        Add
                      </div>
                  }
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
          <Link to={`/admindashboard/manageclasses/${id}/manageclassstudents`} replace={true}>
            <div className="aspect-square w-[25px] h-auto cursor-pointer">
              <img className="invert" src={chevronLeft} alt="chevron left" />
            </div>
          </Link>

          <div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
            Add student in { clasdata.data?.getClass?.data?.strand } { clasdata.data?.getClass?.data?.year }-{ clasdata.data?.getClass?.data?.section }
          </div>
        </div>

        {/* search bar  */}
        <div className="grow flex justify-end pl-[165px]">
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
          
          {/* year and section */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Sex
            </div>
          </div>
          
          {/* sID */}
          <div className=" h-full grow flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              School ID/ Username
            </div>
          </div>


        </div>
        <div className={`w-full ${studClass.loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
          <QueryResult error={clasdata.error || studClass.error} loading={clasdata.loading || studClass.loading} data={clasdata.data || studClass.data}>
            {
              students?.filter((student: Student) => classes.data?.getAllClassWithFilters?.data?.filter((cls: Classs) => cls.students.includes(student.id.replace(' ', ''))).length == 0).map((stud: Student, i: number) => {
                return (
                  <div key={stud.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                    {/* No.  */}
                    <div className=" h-full w-[50px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { i + 1  }
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
                    
                    {/* sex  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { stud.sex }
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
                      <div onClick={() => {
                        setStudID(stud.id)
                        setSelectedStudent(`${stud.name.first} ${stud.name.middle.charAt(0)}${stud.name.middle.charAt(0) !== '' ? '.' : ''} ${stud.name.last} ${stud.name.extension}`)
                        setShowModal(true)
                      }} className=" w-[55px] h-full bg-primary-1 flex items-center justify-center cursor-pointer ">
                        <div className="aspect-square w-[20px] h-auto">
                          <img src={plusWhite} alt="plus icon" />
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