import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const EDIT_CLASS_OPS = gql`
mutation UpdateClass($updateClassId: ID!, $updatedClass: updatedClass!) {
  updateClass(id: $updateClassId, updatedClass: $updatedClass) {
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

const GET_CLASS_QUERY = gql`
query GetClass($getClassId: ID!) {
  getClass(id: $getClassId) {
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

export default function EditClass() {
	const { id } = useParams<{ id: string }>();

	const [strand, setStrand] = useState('')
	const [gradeLevel, setGradeLevel] = useState(0)
	const [section, setSection] = useState('')
	const [semester, setSemester] = useState(0)
	const [saving, setSaving] = useState(false)
	const navigate = useNavigate()

	const { error, loading, data } = useQuery(GET_CLASS_QUERY, { variables: { getClassId: id } } )

	const [editClass] = useMutation(EDIT_CLASS_OPS, {
		onCompleted: (data) => {
			toast.success(data?.updateClass?.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setSaving(false)
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
			setSaving(false)
		}
	})

	useEffect(() => {
		console.log(data);
		
		setStrand(data?.getClass?.data?.strand)
		setGradeLevel(data?.getClass?.data?.gradeLevel)
		setSection(data?.getClass?.data?.section)
		setSemester(data?.getClass?.data?.semester)
	}, [data])

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
					<Link to='/admindashboard/manageclasses' replace={true} aria-disabled={saving}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>
					{/* edit label  */}
					<label className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
						Edit Class
					</label>
				</div>

				{/* save button */}
				<button onClick={() => {
					if (strand === '' || gradeLevel < 11 || gradeLevel > 12 || section === '' || semester < 1 || semester > 3) {
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
					setSaving(true)
					editClass({ variables: { updateClassId: id, updatedClass: { section: section, semester: semester, strand: strand, year: gradeLevel } } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
				{
					saving ?
					<div>saving...</div>
					:
					<div>Save</div>
				}
			</button>
      </div>

			{/* add 2 columns */}
			<div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[238px]">

				{/* column 1 */}
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
						<select onChange={(e) => parseInt(e.target.value)} value={gradeLevel} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value={11}>11</option>
							<option value={12}>12</option>
						</select>
					</div>
				</div>

				{/* column 2 */}
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

