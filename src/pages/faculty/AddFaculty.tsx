import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ADD_FACULTY_OPS = gql`
	mutation addFaculty($newFaculty: newFaculty!) {
  addFaculty(newFaculty: $newFaculty) {
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
      credentials
      email
      password
    }
  }
}
`

/*stated na page na yung 'Add Faculty'
after this, go to index.tsx to import the page*/
export default function AddFaculty() {
	const [firstName, setFirstName] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [lastName, setLastName] = useState('')
	const [extension, setExtension] = useState('')
	const [credentials, setCredentials] = useState('')
	const [email, setEmail] = useState('.faculty@present.po')
	const [password, setPassword] = useState('')
	const [adding, setAdding] = useState(false)

	const navigate = useNavigate()

	const [addFaculty] = useMutation(ADD_FACULTY_OPS, {
		onCompleted: (data) => {
			toast.success(data?.addFaculty?.message, {
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
					<Link to='/admindashboard/managefaculties' replace={true} aria-disabled={adding}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>
						
					{/* add label  */}
					<label className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
						Add Faculty
					</label>
				</div> 

				{/* add button */}
				<button
					onClick={() => {
						if (firstName === '' || lastName === '' ) {
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
							addFaculty({ variables: { newFaculty: { name: { middle: middleName, first: firstName, last: lastName, extension: extension }, credentials: credentials, email: email, password: password } } })
					}}
					className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit"
					>
					{
						adding ?
							<div>
								adding...
							</div>
							:
							<div>
								Add
							</div>
					}
				</button>
    		</div>

			{/* 2 columns - parent */}
			<div className=" grid grid-cols-2 gap-x-[160px] poppins px-80 mt-[94px]">

				{/* column 1 - child */}
				<div className="col-span-1">
					{/* first name  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							First Name
						</label>
						<input
							onChange={(e) => {
								setFirstName(e.target.value)
								setEmail(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}.faculty@present.po`)
								setPassword(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}`)
							}}
							value={firstName}
							className=" poppins text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Enter first name"	
						/>
					</div>

					{/* middle name  */}
          <div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Middle Name
						</label>
						<input
							onChange={(e) => setMiddleName(e.target.value)}
							value={middleName}
							className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Enter middle name"
						/>
					</div>

					{/* last name  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Last Name
						</label>
						<input
							onChange={(e) => {
								setLastName(e.target.value)
								setEmail(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}.faculty@present.po`)
								setPassword(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}`)
							}}
							value={lastName}
							className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Enter last name"
						/>
					</div>
				</div>

				{/* column 2 - child */}
				<div className="col-span-1">
					{/* extension name  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
								Name Extension
						</label>
						<input
							onChange={(e) => setExtension(e.target.value)}
							value={extension}
							className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="e.g. JR."
						/>
					</div>

					{/* email  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Email
						</label>
						<input
								readOnly={true}
								value={email}
								className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
								type="email"
								placeholder="Enter email address"
						/>
					</div>

					{/* password  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Password
						</label>
						<input
							readOnly={true}
							value={password}
							className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Enter password"
						/>
					</div>
				</div>
			</div>

			{/* Credential field - centered */}
			<div className="pb-[50px] ml-[678px] mr-[678px]">
				<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
					Credentials
				</label>
				<input
					onChange={(e) => setCredentials(e.target.value)}
					value={credentials}
					className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Enter credentials"
				/>
			</div>
    </Wrapper>
  )
}