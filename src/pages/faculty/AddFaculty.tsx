import Wrapper from "../../components/Wrapper";
import backIcon from '../assets/left-arrow 1.png';
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const ADD_FACULTY_OPS = gql`
	mutation AddStudent($newFaculty: newFaculty!) {
		addFaculty(newFaculty: $newFaculty) {
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
					credentials
				}
				email
				password
			}
		}
	}
`

/*stated na page na yung 'Add Faculty'
after this, go to index.tsx to import the page*/
export default function AddFaculty() {
	const [adding, setAdding] = useState(false)
	const [newFaculty, setNewFaculty] = useState({
		school_id: '',
		name: {
			first: '',
			middle: '',
			last: '',
			extension: '',
			credentials: ''
		},
		email: '.faculty@present.po',
		password: ''
	})

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
			navigate('/admindashboard/managefaculty', {replace: true})
		}
	})

  return(
    <Wrapper>
      {/* top */}
      <div className="flex justify-between">

				{/* back button  */}
				<div className="flex items-center mt-[50px] ml-[100px]">
				<Link to='/admindashboard/managefaculty' replace={true} aria-disabled={adding}>
					<div className="aspect-square w-[25px] h-auto cursor-pointer">
						<img src={backIcon} alt="chevron left" />
					</div>
				</Link>

				{/* add label  */}
				<div className="ml-[30px] poppins font-bold text-[40px] text-primary-2 ">
					Add Student
				</div>
			</div>

				{/* add button */}
				<div aria-disabled={adding} onClick={() => {
					if (newFaculty.school_id === '' || newFaculty.name.first === '' || newFaculty.name.last === '') {
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
					addFaculty({ variables: { newStudent: newFaculty } })
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
						{/* add 2 columns */}
      			<div className=" grid grid-cols-2 gap-x-[160px] poppins px-80 mt-[94px]">
                
							{/* column 1 */}
							<div className="col-span-1">
								<div className="pb-[50px]">
									<label className="block text-white poppins font-semibold pb-[10px]">
										First Name
									</label>
									<input onChange={(e) => setNewFaculty(prev => ({...prev, email: `${e.target.value.split(' ').join('')}${prev.name.last.split(' ').join('')}.faculty@present.po`.toLowerCase(), password: `${e.target.value.split(' ').join('')}${prev.name.last.split(' ').join('')}`.toLowerCase(), name: {...prev.name, first: e.target.value}}))} value={newFaculty.name.first} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter first name" />
								</div>

								<div className="pb-[50px]">
										<label className="block text-white poppins font-semibold pb-[10px]">
											Middle Name
										</label>
										<input onChange={(e) => setNewFaculty(prev => ({...prev, name: {...prev.name, middle: e.target.value}}))} value={newFaculty.name.middle} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter middle name" />
								</div>

								<div className="pb-[50px]">
									<label className="block text-white font-semibold pb-[10px]">
										Last Name
									</label>
									<input onChange={(e) => setNewFaculty(prev => ({...prev, email: `${prev.name.first.split(' ').join('')}${e.target.value.split(' ').join('')}.faculty@present.po`.toLowerCase(), password: `${prev.name.first.split(' ').join('')}${e.target.value.split(' ').join('')}`.toLowerCase(), name: {...prev.name, last: e.target.value}}))} value={newFaculty.name.last} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter last name"/>
								</div>
							</div>

							{/* column 2 */}
							<div className="col-span-1">
								<div className="pb-[50px]">
									<label className="block text-white font-semibold pb-[10px]">
										Extension Name
									</label>
									<input onChange={(e) => setNewFaculty(prev => ({...prev, name: {...prev.name, extension: e.target.value}}))} value={newFaculty.name.extension} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter extension name" />
								</div>

								<div className="pb-[50px]">
									<label className="block text-white font-semibold pb-[10px]">
										Email
									</label>
									<input readOnly={true} value={newFaculty.email} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter email address" />
								</div>

								<div className="pb-[50px]">
									<label className="block text-white font-semibold pb-[10px]">
										Password
									</label>
									<input readOnly={true} value={newFaculty.password} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter password"/>
								</div>
							</div>
						</div>

						{/* Credential field - centered */}
						<div className="pb-[50px] ml-[678px] mr-[678px]">
							<label className="block text-white font-semibold pb-[10px] flex-none self-center ">
								Credentials
							</label>
								<input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter credentials" />
						</div>
					</>
					:
					<div className=" w-full h-full flex justify-center items-center mt-[100px]">
						<PropagateLoader color="#fff" />
					</div>
			}
    </Wrapper>
  )
}