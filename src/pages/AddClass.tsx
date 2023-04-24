import Wrapper from "../components/Wrapper";
import { Select, Option } from "@material-tailwind/react";
import backIcon from '../assets/left-arrow 1.png';

export default function AddClass() {
  return(
		<Wrapper>
			{/* top */}
			<div className="flex justify-between">

			{/* back button  */}
			<div className="flex items-center mt-[50px] ml-[100px]">
				<img className="w-[25px] h-[25px] mr-[30px]" src={backIcon} alt="back icon"
				/>

				{/* add label  */}
				<div className="poppins font-bold text-[40px] text-primary-2">
					Add Class
				</div>
			</div>

				{/* add button */}
				<button className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					Add
				</button>
				</div>

				{/* add 2 columns */}
				<div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[238px]">

					{/* column 1 */}
					<div className="col-span-1">
						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Strand
							</label>

							<select className="flex h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="abm">ABM</option>
								<option value="gas">GAS</option>
								<option value="humss">HUMSS</option>
								<option value="stem">STEM</option>
							</select>
						</div>

						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Grade Level
							</label>

							<select className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="grade11">11</option>
								<option value="grade12">12</option>
							</select>
						</div>
					</div>

					{/* column 2 */}
					<div className="col-span-1">
						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Section
							</label>

							<select className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="section1"></option>
							</select>
						</div>

						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Semester
							</label>

							<select className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="sem1">1</option>
								<option value="sem2">2</option>
							</select>
						</div>
					</div>
				</div>
		</Wrapper>
  );
	}

