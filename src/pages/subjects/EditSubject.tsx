import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

const EDIT_SUBJECT_OPS = gql`
	mutation UpdateSubject($updateSubjectId: ID!, $updatedSubject: updatedSubject!) {
		updateSubject(id: $updateSubjectId, updatedSubject: $updatedSubject) {
			data {
				id
				code
				name
			}
			error
			message
		}
	}
`
const GET_SUBJECT_QUERY = gql`
	query GetSubject($getSubjectId: ID!) {
  getSubject(id: $getSubjectId) {
    error
    message
    data {
      id
      code
      name
    }
  }
}
`

/*stated na page na yung 'Edit Subject'
after this, go to index.tsx to import the page*/
export default function EditSubject() {
	const { id } = useParams<{ id: string }>();


	const [subjectCode, setSubjectCode] = useState('')
	const [subjectName, setSubjectName] = useState('')
	const [saving, setSaving] = useState(false)
	const navigate = useNavigate()

	const { error, loading, data } = useQuery(GET_SUBJECT_QUERY, { variables: { getSubjectId: id } })
	
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

	const [editSubject] = useMutation(EDIT_SUBJECT_OPS, {
		onCompleted: (data) => {
			toast.success(data?.updateSubject?.message, {
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
			navigate('/admindashboard/managesubjects', {replace: true})
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
		setSubjectCode(data?.getSubject?.data?.code)
		setSubjectName(data?.getSubject?.data?.name)
	}, [data])

  return(
    <Wrapper>
		{/* top */}
		<div className="flex justify-between">

			{/* back button  */}
			<div className="flex items-center mt-[50px] ml-[100px]">
					<Link to='/admindashboard/managesubjects' replace={true}>
						<div className="aspect-square w-[25px] h-auto cursor-pointer">
							<img className="invert" src={backIcon} alt="chevron left" />
						</div>
					</Link>

				{/* edit label  */}
				<label className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
					Edit Subject
				</label>
			</div>

			{/* save button */}
			<button onClick={() => {
					if (subjectCode === '' || subjectName === '') {
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
					editSubject({ variables: { updateSubjectId: id, updatedSubject: {code: subjectCode, name: subjectName } } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
				{
					saving ?
					<div>saving...</div>
					:
					<div>Save</div>
				}
			</button>
      	</div>

    	{/* form */}
      	<div className=" flex flex-row justify-center items-center poppins px-80 drop-shadow-xl mt-[238px]">
        	<div className=" w-[558px] h-[48px] ">
				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Subject Code
					</label>
					<input onChange={(e) => setSubjectCode(e.target.value)} value={subjectCode} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" id="subject-code" type="text" placeholder="Enter subject code"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
						Subject Name
					</label>
					<input onChange={(e) => setSubjectName(e.target.value)} value={subjectName} className="poppins  text-[14px] appearance-none border rounded-[10px] w-full py-[12px] px-[25px] placeholder:text-phGray leading-tight focus:outline-none focus:shadow-outline" id="subject-name" type="text" placeholder="Enter subject name"
					/>
				</div>
			</div>
	    </div>
    </Wrapper>
  );
}