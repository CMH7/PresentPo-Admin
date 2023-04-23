import Wrapper from "../components/Wrapper";
import logo from '../assets/logo.png';
import faculty from '../assets/faculty-dark.png';
import students from '../assets/students-dark.png';
import studentsWhite from '../assets/studentsWhite.png';
import classes from '../assets/classes.png';
import subjects from '../assets/subjects.png';
import schedules from '../assets/schedules.png';
import reports from '../assets/report-dark.png';
import account1 from '../assets/account 1.png';
import logoutwhite from '../assets/logoutwhite.png';
import logout1 from '../assets/logout 1.png';
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";

/*stated na page na yung 'Admin Dashboard'
after this, go to index.tsx to import the page*/
export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const logout = async () => {
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return(
    <Wrapper>
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
              <div className="absolute bottom-[46px] w-[388px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

              {/* buttons  */}
              <div className="w-full flex justify-evenly absolute bottom-[11px]">
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
    	<div className="flex justify-evenly gap-x-[10px] poppins">

        {/* left */}
        <div className="w-[327px] h-[903px] rounded-[20px] mt-[15px] bg-white">

          {/* logo  */}
          <div className="flex mt-[50px] ml-[75px] w-[157px] h-[45px] mb-[28px]">
            <img src={logo} alt="Logo"/> 
          </div>

          {/* Line Break */}
          <div className="ml-[20px] w-[283px] h-0.5 border-t-0 bg-[#072D5F] opacity-25" />

          {/* manage faculty  */}
          <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
            <div className="flex w-[35px] h-[35px] ml-[22px]">
              <img src={faculty} alt="faculty-dark"/> 
            </div>
            <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
							Manage Faculty
						</div>
        	</div>

          {/* manage students  */}
          <Link to='/admindashboard/managestudents'>
            <div className="group flex items-center w-[261px] h-[60px] ml-[32px] mt-[25px] hover:bg-primary-2 rounded-[50px] transition-all duration-300 cursor-pointer">
              <div className="flex w-[35px] h-[35px] ml-[22px]">
                <img className="group-hover:hidden" src={students} alt="students-dark"/>
                <img className="hidden group-hover:block" src={studentsWhite} alt="students-white"/>
              </div>
              <div className="flex poppins font-bold text-[16px] ml-[15px] text-primary-2 select-none group-hover:text-white">
                Manage Students
              </div>
            </div>
          </Link>

            {/* manage classes  */}
            <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
              <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
                <img src={classes} alt="classes"/> 
              </div>
              <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
								Manage Classes
							</div>
            </div>

            {/* manage subjects */}
            <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
              <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
                <img src={subjects} alt="subjects"/> 
              </div>
              <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
								Manage Subjects
							</div>
            </div>

            {/* manage schedules */}
            <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
              <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
                <img src={schedules} alt="schedules"/> 
              </div>
              <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
								Manage Schedules
							</div>
            </div>

            {/* reports */}
            <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
              <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
                <img src={reports} alt="report-dark"/> 
              </div>
              <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
								Reports
							</div>
            </div>

            {/* admin account */}
            <div className="flex flex-col">
              <div className="flex mt-[50px] ml-[128px] mb-[15px] w-[70px] h-[70px]">
                <img src={account1} alt="account1"/>
              </div>
              <div className="flex poppins font-bold text-[16px] justify-center text-primary-2">
                Username
              </div> 

              <button onClick={() => setShowModal(true)} className="group flex justify-center items-center ml-[22px] mt-[30px] mr-[100px] bg-transparent hover:bg-primary-2 text-primary-2 hover:text-white font-semibold rounded-full border-[2px] border-[#072D5F] focus:outline-none focus:shadow-outline w-[283px] h-[55px]" type="submit">
                <div className="flex w-[20px] h-[20px] mr-[10px]">
                  <img className="group-hover:hidden" src={logout1} alt="logout1"/>
                  <img className="hidden group-hover:block" src={logoutwhite} alt="logoutwhite"/>
                </div>
                  Logout
							</button>
            </div>
    		</div>

        {/* middle */}
        <div className="flex w-[1193px] h-[903px] rounded-[20px] mt-[15px] bg-white relative">
					<div className="flex justify-center h-[30px] rounded-[20px] text-[20px] inset-x-0 font-bold text-[#072D5F] ml-[30px] mt-[20px] mb-[15px] bg-white">
						Recent Logs
          </div>
					{/* Line Break */}
          <div className="flex items-center content-center absolute inset-y-0 inset-x-[20px] mt-[123px] w-[1155px] h-0.5 border-t-0 bg-[#072D5F] opacity-25 border-2 border-black">
          </div>
					<div className="flex justify-between items-center content-center absolute inset-y-0 inset-x-[30px] mt-[90px] w-[1032px] h-[21px] rounded-[20px] text-[14px]font-semibold text-[#072D5F] mb-[15px] bg-white">
            <div>Changes in</div>
						<div>Message</div>
						<div>Date</div>	
          </div>
        </div>

        

        {/* right with rows */}
        <div className="grid-rows-4">
          <div className="w-[350px] h-[183px] rounded-[20px] mt-[13px] bg-white">

					</div>
          <div className="flex justify-center items-center w-[350px] h-[61px] text-[#072D5F] text-[20px] font-bold poppins rounded-[20px] mt-[10px] bg-white">
            Today's Attendance
          </div>
          <div className="w-[350px] h-[313px] rounded-[20px] mt-[10px] bg-white">
            

          </div>
          <div className="w-[350px] h-[313px] rounded-[20px] mt-[13px] bg-white">
            
					</div>
        </div>
			</div>
    </Wrapper>
  )
}
