import Wrapper from "../components/Wrapper";
import backIcon from '../assets/left-arrow 1.png'
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin } from "../selectors";
import { Link } from "react-router-dom";
import chevronLeft from '../assets/left-arrow 1.png'
import { setAdmin } from "../features/admins/adminsSlice";
import Admin from "../interfaces/Admin";

const EDIT_ADMIN_OPS = gql`
mutation UpdateAdmin($updateAdminId: ID!, $updatedAdmin: updatedAdmin!) {
  updateAdmin(id: $updateAdminId, updatedAdmin: $updatedAdmin) {
    error
    message
    data {
      id
      name {
        first
        middle
        last
        extension
      }
      email
      password
    }
  }
}
`

/*stated na page na yung 'Edit Admin'
after this, go to index.tsx to import the page*/
export default function EditAdmin() {	
	const [adminn, setAdminn] = useState<Admin>({
		id: '',
		name: {
			first: '',
			middle: '',
			last: '',
			extension: ''
		},
		email: '',
		password: ''
	})

	const [firstname, setFirstName] = useState('')
	const [middlename, setMiddleName] = useState('')
	const [lastname, setLastName] = useState('')
	const [extension, setExtension] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [saving, setSaving] = useState(false)
	const navigate = useNavigate()
	
	useEffect(() => {
    if (localStorage.getItem('admin') == null) {
      navigate('/')
    } else {
      //@ts-ignore
			setAdminn(JSON.parse(localStorage.getItem('admin')))
    }
	}, [])
	
	useEffect(() => {
		setFirstName(adminn.name.first)
		setMiddleName(adminn.name.middle)
		setLastName(adminn.name.last)
		setExtension(adminn.name.extension)
		setEmail(adminn.email)
		setPassword(adminn.password)
	}, [adminn])
	

	const [editAdmin] = useMutation(EDIT_ADMIN_OPS, {
		onCompleted: (data) => {
			toast.success(data?.updateAdmin?.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			localStorage.clear()
			localStorage.setItem('admin', JSON.stringify({id: adminn.id, name: { first: firstname, middle: middlename, last: lastname, extension: extension }, email, password }))
			setSaving(false)
			navigate('/admindashboard', {replace: true})
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

  return(
    <Wrapper>
		{/* top */}
		<div className="flex justify-between">

			{/* back button  */}
			<div className="flex items-center mt-[50px] ml-[100px]">
			<Link to='/admindashboard' replace={true}>
				<div className="aspect-square w-[25px] h-auto cursor-pointer">
				<img src={chevronLeft} alt="chevron left" />
				</div>
			</Link>

				{/* edit label  */}
				<label className=" ml-[30px] poppins font-bold text-[40px] text-primary-2">
					Edit Admin
				</label>
			</div>

			{/* save button */}
			<button onClick={() => {
					if (firstname === '' || lastname === '' || email === '' || password === '') {
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
					editAdmin({ variables: {updateAdminId: adminn.id, updatedAdmin: {email: email, name: {extension: extension,first: firstname,last: lastname ,middle: middlename}, password: password} } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					{
					saving ?
					<div>saving...</div>
					:
					<div>Save</div>
				}	
			</button>
      	</div>

     	{/* add 2 columns */}
      	<div className=" grid grid-cols-2 gap-x-[166px] poppins px-80 mt-[166px]">
                
			{/* column 1 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						First Name
					</label>
						<input onChange={(e) => setFirstName(e.target.value)} value={firstname} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter first name"
						/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						Middle Name
					</label>
					<input onChange={(e) => setMiddleName(e.target.value)} value={middlename} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter middle name"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Last Name
					</label>
					<input onChange={(e) => setLastName(e.target.value)} value={lastname} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter last name"
					/>
				</div>
			</div>

			{/* column 2 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Name Extension
					</label>
					<input onChange={(e) => setExtension(e.target.value)} value={extension} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter name extension"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Username
					</label>
					<input onChange={(e) => setEmail(e.target.value)} value={email} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="string" placeholder="Enter username"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Password
					</label>
					<input onChange={(e) => setPassword(e.target.value)} value={password} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter password"
					/>
				</div>
			</div>
		</div>
    </Wrapper>
  )
}