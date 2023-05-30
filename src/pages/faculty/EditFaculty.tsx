import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";
import EDIT_FACULTY from "../../gql/SET/EDIT/Faculty";
import GET_FACULTY from "../../gql/GET/Faculty";

export default function EditFaculty() {
	const { id } = useParams<{ id: string }>();

	const [firstName, setFirstName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [lastName, setLastName] = useState('')
	const [nameExtension, setNameExtension] = useState('')
	const [credentials, setCredentials] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [saving, setSaving] = useState(false)
	const navigate = useNavigate()

	const { error, loading, data } = useQuery(GET_FACULTY, { variables: { getFacultyId: id } } )

	const [editFaculty] = useMutation(EDIT_FACULTY, {
		onCompleted: (data) => {
			toast.success(data?.updateFaculty?.message, {
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
			navigate('/admindashboard/managefaculties', {replace: true})
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
		setFirstName(data?.getFaculty?.data?.name?.first)
		setMiddleName(data?.getFaculty?.data?.name?.middle)
		setLastName(data?.getFaculty?.data?.name?.last)
		setNameExtension(data?.getFaculty?.data?.name?.extension)
		setCredentials(data?.getFaculty?.data?.credentials)
		setUsername(data?.getFaculty?.data?.username)
		setPassword(data?.getFaculty?.data?.password)
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
				<Link to='/admindashboard/managefaculties' replace={true}>
					<div className="aspect-square w-[25px] h-auto cursor-pointer">
						<img className="invert" src={backIcon} alt="chevron left" />
					</div>
				</Link>

				{/* edit label  */}
				<div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
					Edit Faculty
				</div>
			</div>

			{/* save button */}
			<button
				onClick={() => {
					if (firstName === '' || lastName === '' || username === '' || password === '' || username === '') {
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
					editFaculty({ variables: { updateFacultyId: id, updatedFaculty: { credentials: credentials, username: username, name: { extension: nameExtension, first: firstName, last: lastName, middle: middleName }, password: password } } } )
					setSaving(true)
				}} 
				className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit"
			>
				{
					saving ?
					<div>saving...</div>
					:
					<div>Save</div>
				}
			</button>
		</div>

		{/* add 2 columns */}
		<div className=" grid grid-cols-2 gap-x-[160px] poppins px-80 mt-[94px]">
						
			{/* column 1 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						First Name
					</label>
						<input onChange={(e) => {
							setFirstName(e.target.value)
							setUsername(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}.faculty@present.po`)
							setPassword(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}`)
						}} value={firstName} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter first name" />
				</div>

				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Middle Name
					</label>
					<input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter middle name" />
				</div>

				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Last Name
					</label>
						<input onChange={(e) => {
							setLastName(e.target.value)
							setUsername(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}.faculty@present.po`)
							setPassword(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}`)
						}} value={lastName} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter last name" />
				</div>
			</div>

			{/* column 2 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Name Extension
					</label>
					<input onChange={(e) => setNameExtension(e.target.value)} value={nameExtension} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter name extension" />
				</div>

				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Employee ID/ Username
					</label>
					<input onChange={(e) => setUsername(e.target.value)} value={username} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter username" />
				</div>

				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Password
					</label>
					<input onChange={(e) => setPassword(e.target.value)} value={password} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter password" />
				</div>
			</div>
		</div>

		{/* Credential field - centered */}
		<div className="pb-[50px] ml-[678px] mr-[678px]">
			<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
				Credentials
			</label>
			<input onChange={(e) => setCredentials(e.target.value)} value={credentials} className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter credentials" />
		</div>
    </Wrapper>
  );
}