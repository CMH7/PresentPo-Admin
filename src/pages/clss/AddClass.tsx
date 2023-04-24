import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";

const ADD_CLASS_OPS = gql`
	mutation addClass($newClass: newClass!) {
		addClass(newClass: $newClass) {
			error
			message
			data {
				id
				strand
				year
				section
				semester
				students
			}
  }
}
`

export default function AddClass() {
	const [strand, setStrand] = useState('ABM')
	const [gradeLevel, setGradeLevel] = useState(11)
	const [section, setSection] = useState('section1')
	const [semester, setSemester] = useState(1)
	const [adding, setAdding] = useState(false)

	const navigate = useNavigate()

	const [addClass] = useMutation(ADD_CLASS_OPS, {
		onCompleted: (data) => {
			toast.success(data?.addClass?.message, {
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
			navigate('/admindashboard/manageclasses', {replace: true})
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
				<button onClick={() => {					
					console.log(typeof strand);
					console.log(typeof gradeLevel);
					console.log(typeof section);
					console.log(typeof semester);
					
					if (strand === '' || gradeLevel <= 10 || gradeLevel > 12 || section === '' || semester <= 0 || semester > 3 ) {
						toast.error('Invalid inputs', {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
						return
					}
					setAdding(true)
					addClass({ variables: { newClass: { strand: strand, year: gradeLevel, section: section, semester: semester } } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]">
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
						<select onChange={(e) => setStrand(e.target.value)} value={strand} className="flex h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							<option value="ABM">ABM</option>
							<option value="GAS">GAS</option>
							<option value="HUMSS">HUMSS</option>
							<option value="STEM">STEM</option>
						</select>
					</div>

					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							Grade Level
						</label>
						<select onChange={(e) => setGradeLevel(parseInt(e.target.value))} value={gradeLevel} className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							<option value={11}>11</option>
								<option value={12}>12</option>
							</select>
						</div>
					</div>

					{/* column 2 */}
					<div className="col-span-1">
						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Section
							</label>
							<select onChange={(e) => setSection(e.target.value)} value={section} className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="Orion">Orion</option>
								<option value="Leo">Leo</option>
								<option value="Beethoven">Beethoven</option>
								<option value="Mozart">Mozart</option>
								<option value="Morgan">Morgan</option>
								<option value="Wedgwood">Wedgwood</option>
								<option value="Da Vinci">Da Vinci</option>
								<option value="Rembrandt">Rembrandt</option>
							</select>
						</div>

						<div className="pb-[50px]">
							<label className="block text-white poppins font-semibold pb-[10px]">
								Semester
							</label>
							<select onChange={(e) => setSemester(parseInt(e.target.value))} value={semester} className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value={1}>1</option>
								<option value={2}>2</option>
							</select>
						</div>
					</div>
				</div>
		</Wrapper>
  	);
}

