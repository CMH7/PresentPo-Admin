import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

const EDIT_STUDENT_OPS = gql`
	mutation UpdateStudent($updateStudentId: ID!, $updatedStudent: updatedStudent!) {
		updateStudent(id: $updateStudentId, updatedStudent: $updatedStudent) {
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

const GET_STUDENT_QUERY = gql`
	query GetStudent($getStudentId: ID!) {
		getStudent(id: $getStudentId) {
			data {
				age
				id
				school_id
				name {
					first
					middle
					last
					extension
				}
				sex
				email
				password
			}
			error
			message
		}
	}
`

/*stated na page na yung 'Edit Student'
after this, go to index.tsx to import the page*/
export default function EditStudent() {
	const { id } = useParams<{ id: string }>();
	
	const [schoolID, setschoolID] = useState('')
	const [firstName, setFirstName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [lastName, setLastName] = useState('')
	const [extension, setExtension] = useState('')
	const [sex, setSex] = useState('')
	const [age, setAge] = useState(0)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [saving, setSaving] = useState(false)
	const navigate = useNavigate()

	const { error, loading, data } = useQuery(GET_STUDENT_QUERY, { variables: { getStudentId: id } })
	
	useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      navigate('/', {replace: true})
    }
  }, [])

	const [editStudent] = useMutation(EDIT_STUDENT_OPS, {
		onCompleted: (data) => {
			toast.success(data?.updateStudent?.message, {
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
			setSaving(false)
		}
	})

	useEffect(() => {
		setschoolID(data?.getStudent?.data?.school_id)
		setFirstName(data?.getStudent?.data?.name.first)
		setMiddleName(data?.getStudent?.data?.name.middle)
		setLastName(data?.getStudent?.data?.name.last)
		setExtension(data?.getStudent?.data?.name.extension)
		setSex(data?.getStudent?.data?.sex)
		setAge(data?.getStudent?.data?.age)
		setEmail(data?.getStudent?.data?.email)
		setPassword(data?.getStudent?.data?.password)
	}, [data])

  return(
    <Wrapper>
      {/* top */}
      <div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/managestudents' replace={true}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>

					{/* edit label  */}
					<label className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
						Edit Student
					</label>
				</div>

				{/* save button */}
				<button onClick={() => {
					if (lastName === '' || firstName === '' || email === '' || password === '' || schoolID === '') {
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
					editStudent({ variables: { updateStudentId: id, updatedStudent: {age: age, email: email, name: {extension: extension, first: firstName, last: lastName, middle: middleName }, password: password, school_id: schoolID, sex: sex } } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					Save
				</button>
      </div>

      {/* add 2 columns */}
      <div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[166px]">
                
				{/* column 1 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							First Name
						</label>
						<input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter first name" />
					</div>
					
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Middle Name
						</label>
						<input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter middle name" />
					</div>

					<div className="pb-[50px]">
						<label className="text-white font-semibold pb-[10px] text-[20px] ">
							Last Name
						</label>
						<input onChange={(e) => setLastName(e.target.value)} value={lastName} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter last name"/>
					</div>
						
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Extension Name
						</label>
						<input onChange={(e) => setExtension(e.target.value)} value={extension} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter extension name" />
					</div>
					
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Age
						</label>
							<input onChange={(e) => setAge(parseInt(e.target.value))} value={age} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="number" pattern="\d*" placeholder="Enter age" />
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Sex
						</label>
						<select onChange={(e) => setSex(e.target.value)} value={sex} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" name="sex" id="sex">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
						
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							School ID
						</label>
							<input onChange={(e) => setschoolID(e.target.value)} value={schoolID} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter school id" />
					</div>

					<div className="pb-[50px]">
						<label className="text-white font-semibold pb-[10px] text-[20px] ">
							Email
						</label>
						<input onChange={(e) => setEmail(e.target.value)} value={email} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter email address"/>
					</div>

					<div className="pb-[50px]">
						<label className="text-white font-semibold pb-[10px] text-[20px] ">
							Password
						</label>
						<input onChange={(e) => setPassword(e.target.value)} value={password} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter password"/>
					</div>
				</div>
			</div>
    </Wrapper>
  )
}