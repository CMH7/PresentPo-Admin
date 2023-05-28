import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

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

	useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      navigate('/', {replace: true})
    }
  }, [])

  return(
		<Wrapper>
			{/* top */}
			<div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/manageclasses' replace={true} aria-disabled={adding}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>

					{/* add label  */}
					<div className=" ml-[30px] poppins font-bold text-[40px] text-white">
						Add Class
					</div>
				</div>

				{/* add button */}
				<button onClick={() => {					
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

			{/* add 2 columns - parent */}
			<div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[238px]">

				{/* column 1 - child */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Strand
						</label>
						<select onChange={(e) => setStrand(e.target.value)} value={strand} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value="ABM">ABM</option>
							<option value="GAS">GAS</option>
							<option value="HUMSS">HUMSS</option>
							<option value="STEM">STEM</option>
						</select>
					</div>

					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Grade Level
						</label>
						<select onChange={(e) => setGradeLevel(parseInt(e.target.value))} value={gradeLevel} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value={11}>11</option>
								<option value={12}>12</option>
							</select>
						</div>
					</div>

					{/* column 2 - child */}
					<div className="col-span-1">
						<div className="pb-[50px]">
							<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
								Section
							</label>
							<select onChange={(e) => setSection(e.target.value)} value={section} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
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
							<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
								Semester
							</label>
							<select onChange={(e) => setSemester(parseInt(e.target.value))} value={semester} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
								<option value={1}>1</option>
								<option value={2}>2</option>
							</select>
						</div>
					</div>
				</div>
		</Wrapper>
  	);
}

