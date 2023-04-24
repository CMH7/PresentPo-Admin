import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useState } from "react";
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

  return(
		<Wrapper>
			{/* top */}
      <div className="flex justify-between">
		    {/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/managefaculties' replace={true} aria-disabled={adding}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img src={backIcon} alt="chevron left" />
						</div>
					</Link>
					
          {/* add label  */}
					<label className=" ml-[30px] poppins font-bold text-[40px] text-primary-2">
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

    {/* add 2 columns */}
    <div className=" grid grid-cols-2 gap-x-[160px] poppins px-80 mt-[94px]">
    	{/* column 1 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						First Name
					</label>
						<input onChange={(e) => {
							setFirstName(e.target.value)
							setEmail(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}.faculty@present.po`)
							setPassword(`${e.target.value.split(' ').join('').toLowerCase()}${lastName.split(' ').join('').toLowerCase()}`)
						}} value={firstName} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter first name"	
                    />
				</div>

                <div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						Middle Name
					</label>
					<input onChange={(e) => setMiddleName(e.target.value)} value={middleName} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter middle name"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Last Name
					</label>
						<input onChange={(e) => {
							setLastName(e.target.value)
							setEmail(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}.faculty@present.po`)
							setPassword(`${firstName.split(' ').join('').toLowerCase()}${e.target.value.split(' ').join('').toLowerCase()}`)
						}} value={lastName} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter last name"
					/>
				</div>
			</div>

			{/* column 2 */}
			<div className="col-span-1">
				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
			    		Name Extension
					</label>
					<input onChange={(e) => setExtension(e.target.value)} value={extension} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sections-handled" type="text" placeholder="e.g. JR."
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white font-semibold pb-[10px]">
						Email
					</label>
					<input readOnly={true} value={email} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address"
					/>
				</div>

				<div className="pb-[50px]">
	    			<label className="block text-white font-semibold pb-[10px]">
						Password
					</label>
					<input readOnly={true} value={password} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter password"
					/>
				</div>
			</div>
		</div>

		{/* Credential field - centered */}
		<div className="pb-[50px] ml-[678px] mr-[678px]">
			<label className="block text-white font-semibold pb-[10px] flex-none self-center ">
				Credentials
			</label>
			<input onChange={(e) => setCredentials(e.target.value)} value={credentials} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Enter credentials"
			/>
		</div>
    </Wrapper>
  )
}