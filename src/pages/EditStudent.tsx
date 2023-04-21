import Wrapper from "../components/Wrapper";
import backIcon from '../assets/left-arrow 1.png'

/*stated na page na yung 'Edit Student'
after this, go to index.tsx to import the page*/

export default function EditStudent() {
  return(
    <Wrapper>
      {/* top */}
      <div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<img className="w-[25px] h-[25px] mr-[30px]" src={backIcon} alt="back icon"
					/>
					{/* edit label  */}
					<div className="poppins font-bold text-[40px] text-primary-2">
						Edit Student
					</div>
				</div>

				{/* save button */}
				<button className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					Save
				</button>
      </div>

      {/* add 2 columns */}
      <div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[166px]">
                
				{/* column 1 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							Last Name
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter last name"
							/>
					</div>

					<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								First Name
							</label>
								<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter first name"
								/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Middle Name
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter middle name"
							/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Name Extension
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sections-handled" type="text" placeholder="e.g. JR."
							/>
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
				<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Sex
							</label>

								<select className="flex h-[38px] w-[558px] border rounded border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-[#072D5F] outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
						</div>
					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Age
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sections-handled" type="text" placeholder="Enter age"
							/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Email
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address"
							/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Password
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password"
							/>
					</div>
				</div>
			</div>
    </Wrapper>
  )
}