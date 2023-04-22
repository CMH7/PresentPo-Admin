import Wrapper from "../components/Wrapper";
import backIcon from '../assets/left-arrow 1.png';

/*stated na page na yung 'Edit Student'
after this, go to index.tsx to import the page*/
export default function AddStudent() {
    return(
        <Wrapper>
           {/* top */}
			<div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<img className="w-[25px] h-[25px] mr-[30px]" src={backIcon} alt="back icon"/>

					{/* add label  */}
					<div className="poppins font-bold text-[40px] text-primary-2">
						Add Student
					</div>
				</div>

				{/* add button */}
				<button className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					Add
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
						<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter last name" />
					</div>

					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							Sex
						</label>

						<div className="pb-[50px]">
							<label className="block text-white font-semibold pb-[10px]">
								Middle Name
							</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter middle name"/>
						</div>
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Name Extension
						</label>
						<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sections-handled" type="text" placeholder="e.g. JR."/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Email
						</label>
						<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address"/>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Password
						</label>
						<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password"/>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}