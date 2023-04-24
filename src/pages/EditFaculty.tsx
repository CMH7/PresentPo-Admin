import Wrapper from "../components/Wrapper";
import backIcon from '../assets/left-arrow 1.png';
import { Link, useParams } from 'react-router-dom';

/*stated na page na yung 'Edit Faculty'
after this, go to index.tsx to import the page*/
export default function EditFaculty() {
	const { id } = useParams<{ id: string }>();

  return(
    <Wrapper>
      {/* top */}
      <div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/managefaculty' replace={true}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img src={backIcon} alt="chevron left" />
						</div>
					</Link>

					{/* edit label  */}
					<div className=" ml-[30px] poppins font-bold text-[40px] text-primary-2">
						Edit Student
					</div>
				</div>

				{/* save button */}
				<button className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					Save
				</button>
			</div>

      {/* add 2 columns */}
      <div className=" grid grid-cols-2 gap-x-[160px] poppins px-80 mt-[94px]">
                
				{/* column 1 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							First Name
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter first name" />
					</div>

					<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Middle Name
							</label>
								<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter middle name" />
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Last Name
						</label>
							<input value={id} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter last name" />
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Name Extension
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sections-handled" type="text" placeholder="Enter name extension" />
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Email
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address" />
					</div>

					<div className="pb-[50px]">
						<label className="block text-white font-semibold pb-[10px]">
							Password
						</label>
							<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password" />
					</div>
				</div>
			</div>

			{/* Credential field - centered */}
			<div className="pb-[50px] ml-[678px] mr-[678px]">
				<label className="block text-white font-semibold pb-[10px] flex-none self-center">
					Credentials
				</label>
					<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter credentials" />
			</div>
    </Wrapper>
  )
}