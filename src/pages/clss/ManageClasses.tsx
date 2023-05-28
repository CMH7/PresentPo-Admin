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
import { toast } from "react-toastify"
import Classs from "../../interfaces/Classs"
import ALL_CLASS from "../../gql/GET/ALL/Classs"

export default function ManageClasses() {

  const [showModal, setShowModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState<Classs[]>([])
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const { error, loading, data } = useQuery(ALL_CLASS, { variables: { filters: {} } })

  useEffect(() => {
    setClasses(data?.getAllClassWithFilters?.data)
  }, [loading])

  const searchNow = (searchFor: string) => {
    setClasses(data?.getAllClassWithFilters?.data)
    if (searchFor !== '' ) {
      setClasses(classs => classs.filter((cls: Classs) => {
        let classData = `${cls.strand} ${cls.year} ${cls.section} ${cls.semester}`.toLowerCase()
        if ( classData.match(searchFor.toLowerCase()) ) {
          return cls
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
                Are you sure you want to delete this class <br /> <span className="italic">{ selectedClass }</span> ?
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
            Manage Classes
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
          <Link to='/admindashboard/manageclasses/addclass' replace={true}>
            <div className="group w-[220px] h-[55px] flex items-center justify-center bg-primary-2 hover:bg-white transition-all rounded-[50px] cursor-pointer">
              {/* icon  */}
              <div className="aspect-square w-[20px] h-auto ">
                <img className="group-hover:hidden" src={plusWhite} alt="plus white icon" />
                <img className="hidden group-hover:block" src={plusPrim} alt="plus primary icon" />
              </div>

              {/* text  */}
              <div className="ml-[10px] poppins font-semibold text-[20px] text-white group-hover:text-primary-2 select-none">
                Add Class
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
          
          {/* strand  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Strand
            </div>
          </div>
          
          {/* grade level  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Grade Level
            </div>
          </div>
          
          {/* section  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Section
            </div>
          </div>
          
          {/* semester  */}
          <div className=" h-full w-[200px] shrink-0 flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              Semester
            </div>
          </div>

          {/* school year */}
          <div className=" h-full grow flex items-center ">
            <div className=" poppins font-bold text-[20px] text-primary-2 ">
              School Year
            </div>
          </div>
        </div>

        <div className={`w-full ${loading ? 'h-full flex flex-col justify-center items-center' : 'h-fit'}`}>
          <QueryResult error={error} loading={loading} data={data}>
            {
              classes?.map((classs: Classs, i: number) => {
                return (
                  <div key={classs.id} className=" w-full h-fit py-[15px] bg-white hover:bg-gray-200 mb-[2px] flex items-center px-[20px] relative overflow-hidden group transition-all ">
                    {/* No.  */}
                    <div className=" h-full w-[50px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { i + 1 }
                      </div>
                    </div>
                    
                    {/* strand  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { classs.strand }
                      </div>
                    </div>
                    
                    {/* year  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { classs.year }
                      </div>
                    </div>
                    
                    {/* section  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { classs.section }
                      </div>
                    </div>
                    
                    {/* section  */}
                    <div className=" h-full w-[200px] shrink-0 flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { classs.semester }
                      </div>
                    </div>
                    
                    {/* school year */}
                    <div className=" h-full grow flex items-center ">
                      <div className=" poppins font-medium text-[16px] text-primary-2 ">
                        { classs.sy }
                      </div>
                    </div>

                    {/* actions  */}
                    <div className="absolute z-10 top-0 -right-[350px] group-hover:right-0 transition-all w-fit h-full flex items-center">
                      {/* manage class's students  */}
                      <Link className="w-fit h-full" to={`/admindashboard/manageclasses/${classs.id}/manageclassstudents`}>
                        <div className=" poppins text-[14px] text-primary-1 hover:underline h-full px-2 mr-[20px] flex items-center justify-center select-none cursor-pointer ">
                          Manage class' students
                        </div>
                      </Link>

                      {/* edit subject  */}
                      <Link className="w-[55px] h-full" to={`/admindashboard/manageclasses/editclass/${classs.id}`}>
                        <div className=" w-full h-full bg-primary-1 flex items-center justify-center cursor-pointer ">
                          <div className="aspect-square w-[20px] h-auto">
                            <img src={editIcon} alt="edit icon" />
                          </div>
                        </div>
                      </Link>

                      {/* delete student  */}
                      <div onClick={() => {
                        setSelectedClass(`${classs.strand} ${classs.year}-${classs.section}`)
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