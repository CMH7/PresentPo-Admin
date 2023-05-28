import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EDIT_CLASSS from "../../gql/SET/EDIT/Classs";
import GET_CLASS from "../../gql/GET/Classs";

export default function EditClass() {
	const { id } = useParams<{ id: string }>();

	const [strand, setStrand] = useState('')
	const [year, setYear] = useState(0)
	const [section, setSection] = useState('')
	const [semester, setSemester] = useState(0)
	const [saving, setSaving] = useState(false)
	const [sy, setSY] = useState(`${new Date().getFullYear()}-${new Date().getFullYear()+1}`)
	const navigate = useNavigate()
	const sections = ['Orion', 'Leo', 'Beethoven', 'Mozart', 'Morgan', 'Wedgwood', 'Da Vinci', 'Rembrandt']
	const { error, loading, data } = useQuery(GET_CLASS, { variables: { getClassId: id } } )

	const [editClass] = useMutation(EDIT_CLASSS, {
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
		setStrand(data?.getClass?.data?.strand)
		setYear(data?.getClass?.data?.year)
		setSection(data?.getClass?.data?.section)
		setSemester(data?.getClass?.data?.semester)
		setSY(data?.getClass?.data?.sy)
	}, [data])

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
					if (strand === '' || year < 11 || year > 12 || section === '' || semester < 1 || semester > 3) {
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
					editClass({ variables: { updateClassId: id, updatedClass: { section: section, semester: semester, strand: strand, year: year, sy: sy } } })
					setSaving(true)
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
					{/* strand  */}
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

					{/* year  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Grade Level
						</label>
						<select onChange={(e) => setYear( parseInt(e.target.value))} value={year} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value={11}>11</option>
							<option value={12}>12</option>
						</select>
					</div>
					
					{/* sections  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Section
						</label>
						<select onChange={(e) => setSection(e.target.value)} value={section} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
								{
									sections.map((section: string) => {
										return <option value={section}>{section}</option>
									})
								}
						</select>
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">

					{/* school year  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							School year
						</label>
						<select onChange={(e) => setSY(e.target.value)} value={sy} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value="2020-2021">2020-2021</option>
							<option value="2021-2022">2021-2022</option>
							<option value="2022-2023">2022-2023</option>
							<option value="2023-2024">2023-2024</option>
							<option value="2024-2025">2024-2025</option>
							<option value="2025-2026">2025-2026</option>
						</select>
					</div>
					
					{/* semester  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Semester
						</label>
						<select onChange={(e) => setSemester(parseInt(e.target.value))} value={semester} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline">
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</div>
				</div>
			</div>
		</Wrapper>
  	);
}

