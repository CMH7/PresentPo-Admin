import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const EDIT_SUBJECT_OPS = gql`
	mutation EditSubject($subject: newSubject!) {
  editSubject(subject: $subject) {
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
	const [subjectCode, setSubjectCode] = useState('')
	const [subjectName, setSubjectName] = useState('')
	const [editing, setEditing] = useState(false)
	const navigate = useNavigate()

	const [editSubject] = useMutation(EDIT_SUBJECT_OPS, {
		onCompleted: (data) => {
			toast.success(data?.editSubject?.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setEditing(false)
			navigate('/admindashboard/managesubjects', {replace: true})
		}
	})

  return(
    <Wrapper>
		{/* top */}
		<div className="flex justify-between">

			{/* back button  */}
			<div className="flex items-center mt-[50px] ml-[100px]">
				<img className="w-[25px] h-[25px] mr-[30px]" src={backIcon} alt="back icon"
				/>

				{/* edit label  */}
				<label className="poppins font-bold text-[40px] text-primary-2">
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
					setEditing(true)
					editSubject({ variables: {  subject: {code: subjectCode,name: subjectName } } })
				}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
				Save
			</button>
      	</div>

    	{/* form */}
      	<div className=" flex flex-row justify-center items-center poppins px-80 drop-shadow-xl mt-[238px]">
        	<div className=" w-[558px] h-[48px] ">
				<div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						Subject Code
					</label>
					<input onChange={(e) => setSubjectCode(e.target.value)} value={subjectCode} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject-code" type="text" placeholder="Enter subject code"
					/>
				</div>

				<div className="pb-[50px]">
					<label className="block text-white poppins font-semibold pb-[10px]">
						Subject Name
					</label>
					<input onChange={(e) => setSubjectName(e.target.value)} value={subjectName} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject-name" type="text" placeholder="Enter subject name"
					/>
				</div>
			</div>
	    </div>
    </Wrapper>
  );
}