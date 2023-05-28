import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const ADD_STUDENT_OPS = gql`
	mutation AddStudent($newStudent: newStudent!) {
		addStudent(newStudent: $newStudent) {
			error
			message
			data {
				id
				school_id
				name {
					first
					middle
					last
					extension
				}
				age
				sex
				email
				password
			}
		}
	}
`

/*stated na page na yung 'Add Student'
after this, go to index.tsx to import the page*/
export default function AddStudent() {
	const [adding, setAdding] = useState(false)
	const [newStudent, setNewStudent] = useState({
		school_id: '',
		name: {
			first: '',
			middle: '',
			last: '',
			extension: ''
		},
		age: 0,
		sex: 'Male',
		email: '.student@present.po',
		password: ''
	})

	const navigate = useNavigate()

	useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      navigate('/', {replace: true})
    }
  }, [])

	const [addStudent] = useMutation(ADD_STUDENT_OPS, {
		onCompleted: (data) => {
			toast.success(data?.addStudent?.message, {
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
			navigate('/admindashboard/managestudents', {replace: true})
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

	return (
		<Wrapper>
			{/* top */}
			<div className="flex justify-between">
				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/managestudents' replace={true} aria-disabled={adding}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>

					{/* add label  */}
					<div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
						Add Student
					</div>
				</div>

				{/* add button */}
				<div aria-disabled={adding}
					onClick={() => {
						if (newStudent.school_id === '' || newStudent.name.first === '' || newStudent.name.last === '' || newStudent.sex === '' || newStudent.age <= 13) {
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
							addStudent({ variables: { newStudent: newStudent } })
					}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#218a18] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px] cursor-pointer select-none ">
					{
						!adding ? 
							<div>
								Add
							</div>
							:
							<div>
								adding...
							</div>
					}
				</div>
			</div>
			{
				!adding ?
				<>

					{/* fields */}
					<div className=" grid grid-cols-2 gap-x-[160px] px-[316px] mt-[100px] ">
											
						{/* column 1 */}
						<div className="col-span-1">
							<div className="pb-[50px]">
								<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
									First Name
								</label>
								<input onChange={(e) => setNewStudent(prev => ({...prev, email: `${e.target.value.split(' ').join('')}${prev.name.last.split(' ').join('')}.student@present.po`.toLowerCase(), password: `${e.target.value.split(' ').join('')}${prev.name.last.split(' ').join('')}`.toLowerCase(), name: {...prev.name, first: e.target.value}}))} value={newStudent.name.first} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter first name" />
							</div>
								
							<div className="pb-[50px]">
								<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
									Middle Name
								</label>
								<input onChange={(e) => setNewStudent(prev => ({...prev, name: {...prev.name, middle: e.target.value}}))} value={newStudent.name.middle} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter middle name" />
							</div>

							<div className="pb-[50px]">
								<label className="text-white font-semibold pb-[10px] text-[20px] ">
									Last Name
								</label>
								<input onChange={(e) => setNewStudent(prev => ({...prev, email: `${prev.name.first.split(' ').join('')}${e.target.value.split(' ').join('')}.student@present.po`.toLowerCase(), password: `${prev.name.first.split(' ').join('')}${e.target.value.split(' ').join('')}`.toLowerCase(), name: {...prev.name, last: e.target.value}}))} value={newStudent.name.last} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter last name"/>
							</div>
									
							<div className="pb-[50px]">
								<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
									Extension Name
								</label>
								<input onChange={(e) => setNewStudent(prev => ({...prev, name: {...prev.name, extension: e.target.value}}))} value={newStudent.name.extension} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter extension name" />
							</div>
						</div>

						{/* column 2 */}
						<div className="col-span-1">			
							<div className="pb-[50px]">
								<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
									Sex
								</label>
								<select onChange={(e) => setNewStudent(prev => ({...prev, sex: e.target.value}))} value={newStudent.sex} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" name="sex" id="sex">
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
									
							<div className="pb-[50px]">
								<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
									School ID
								</label>
									<input onChange={(e) => {
										if (e.target.value.match(/[^0-9\-]/g)) return
										setNewStudent(prev => ({ ...prev, school_id: e.target.value }))
									}} value={newStudent.school_id} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter school id" />
							</div>

							<div className="pb-[50px]">
								<label className="text-white font-semibold pb-[10px] text-[20px] ">
									Email
								</label>
								<input readOnly={true} value={newStudent.email} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter email address"/>
							</div>

							<div className="pb-[50px]">
								<label className="text-white font-semibold pb-[10px] text-[20px] ">
									Password
								</label>
								<input readOnly={true} value={newStudent.password} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter password"/>
							</div>
						</div>
					</div>
				</>
				:
				<div className=" w-full h-full flex justify-center items-center mt-[100px]">
					<PropagateLoader color="#fff" />
				</div>
			}
		</Wrapper>
	);
}
