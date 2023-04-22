import Wrapper from "../components/Wrapper";
import logo from '../assets/logo.png';
import faculty from '../assets/faculty-dark.png';
import students from '../assets/students-dark.png';
import classes from '../assets/classes.png';
import subjects from '../assets/subjects.png';
import schedules from '../assets/schedules.png';
import reports from '../assets/report-dark.png';
import account1 from '../assets/account 1.png';
import logout1 from '../assets/logout 1.png';
import React from 'react';

/*stated na page na yung 'Admin Dashboard'
after this, go to index.tsx to import the page*/
export default function AdminDashboard() {
  return(
    <Wrapper>
      {/* columns*/}
    	<div className="flex justify-evenly gap-x-[10px] poppins">

        {/* left */}
        <div className="w-[327px] h-[903px] rounded-[20px] mt-[15px] bg-white">

          {/* logo  */}
          <div className="flex mt-[50px] ml-[75px] w-[157px] h-[45px] mb-[28px]">
            <img src={logo} alt="Logo"/> 
          </div>

          {/* Line Break */}
          <div className="ml-[20px] w-[283px] h-0.5 border-t-0 bg-[#072D5F] opacity-50">
          </div>

          {/* manage faculty  */}
          <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
            <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
              <img src={faculty} alt="faculty-dark"/> 
            </div>
            <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
							Manage Faculty
						</div>
        	</div>

        	{/* manage students  */}
          <div className=" flex w-[261px] h-[60px] ml-[32px] mt-[25px]">
            <div className="flex w-[35px] h-[35px] mt-[3px] ml-[22px]">
              <img src={students} alt="students-dark"/> 
            </div>
          <div className="flex poppins font-bold text-[16px] mt-[10px] ml-[15px] text-primary-2">
						Manage Students
					</div>
            </div>

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

              <button className="flex justify-center items-center ml-[22px] mt-[30px] mr-[100px] bg-transparent hover:bg-[#1672ec] text-[#072D5F] font-semibold rounded-full border-[2px] border-[#072D5F] focus:outline-none focus:shadow-outline w-[283px] h-[55px]" type="submit">
                <div className="flex w-[20px] h-[20px] mr-[10px]">
                  <img src={logout1} alt="logout1"/>
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
