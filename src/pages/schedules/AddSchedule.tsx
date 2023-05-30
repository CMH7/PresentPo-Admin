import Wrapper from "../../components/Wrapper";
import backIcon from '../../assets/left-arrow 1.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Subject from "../../interfaces/Subject";
import Faculty from "../../interfaces/Faculty";
import Classs from "../../interfaces/Classs";
import ALL_SUBJECTS from "../../gql/GET/ALL/Subject";
import ALL_FACULTY from "../../gql/GET/ALL/Faculty";
import ALL_SCHEDULE from "../../gql/GET/ALL/Schedule";
import ALL_CLASS from "../../gql/GET/ALL/Classs";
import ADD_SCHEDULE from "../../gql/SET/ADD/Schedule";

export default function AddSchedule() {
	const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const minutes: number[] = [0, 10, 20, 30, 40, 50]
	const strands = ['ABM', 'GAS', 'STEM', 'HUMMS']

	const [adding, setAdding] = useState(false)

	const navigate = useNavigate()

	const allSubjects = useQuery(ALL_SUBJECTS, { variables: { filters: {} } })
	const allFaculties = useQuery(ALL_FACULTY, { variables: { filters: {} } })
	const allScheds = useQuery(ALL_SCHEDULE, { variables: { filters: {} } })
	const allClass = useQuery(ALL_CLASS, { variables: { filters: {} } })
	const [addSchedule] = useMutation(ADD_SCHEDULE, {
		onCompleted: (data) => {
			toast.success(data?.addSchedule?.message, {
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
			navigate('/admindashboard/manageschedules', {replace: true})
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
	
	const [subject, setSubject] = useState('')
	const [day, setDay] = useState(dayNames[0])
	const [startTime, setStartTime] = useState({minute: 0, hour: 1, shift: 'AM'})
	const [endTime, setEndTime] = useState({ minute: 0, hour: 1, shift: 'PM' })
	const [faculty, setFaculty] = useState('')
	const [sClass, setSClass] = useState('')

	useEffect(() => {
		setSubject(allSubjects.data?.getAllSubjectsWithFilters?.data[0]?.id)
		setSClass(allClass.data?.getAllClassWithFilters?.data[0]?.id)
		setFaculty(allFaculties.data?.getAllFacultyWithFilters?.data[0]?.id)
	}, [allFaculties.data])
	
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
					<Link to='/admindashboard/manageschedules' replace={true}>
            <div className="aspect-square w-[25px] h-auto cursor-pointer">
              <img className="invert" src={backIcon} alt="chevron left" />
            </div>
					</Link>
					
					{/* add button  */}
					<div className="ml-[30px] poppins text-[40px] font-bold text-white select-none">
						Add Schedule
					</div>
				</div>

				{/* save button */}
				<button onClick={() => {
						addSchedule({
							variables: {
								schedule: {
									class: sClass,
									faculty: faculty,
									subject: subject,
									schedule: {
										day: day,
										start_time: startTime,
										end_time: endTime
									}
								}
							}
						})
						setAdding(true)
					}} className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
					{
						adding ? <div>
							adding...
						</div> : <div>
								Add
						</div>
					}
				</button>
			</div>

			{/* parent - add 2 columns */}
			<div className=" grid grid-cols-2 gap-x-[175px] poppins px-80 mt-[238px]">

				{/* column 1 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Subject
						</label>

						<select onChange={e => setSubject(e.target.value)} value={subject} className="flex h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							{
								allSubjects.data?.getAllSubjectsWithFilters?.data?.map((subject: Subject) => {
									return <option key={subject.id} value={subject.id}> { `(${subject.code}) ${subject.name}` } </option>
								})
							}
						</select>
					</div>

					<div className="pb-[20px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Schedule
						</label>
					</div>

					{/* for schedule day, start time, end time column */}
					<div className="flex w-[603px] gap-x-[10px] poppins">
						
						{/* dropdown for day  */}
						<div className="flex w-[227px] flex-wrap border-2 border-transparent rounded-[10px] relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<label className="w-[81px] h-full bg-primary-2 m-8 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									Day
								</label>
							</div>

							<div className="flex w-full gap-x-[10px]">
								<select onChange={e => setDay(e.target.value)} value={day} className="peer h-[48px] w-[123px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										dayNames.map((name: string) => {
											return <option key={name} value={name.substring(0, 3)}> { name } </option>
										})
									}
								</select>
							</div>
						</div>

						{/* start time  */}
						<div className="flex w-[250px] flex-wrap border-2 border-white rounded-[10px] p-2 relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<label className="w-[81px] h-full bg-primary-2 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									Start time
								</label>
							</div>

							{/* hour and minute  */}
							<div className="flex w-full gap-x-[5px]">
								{/* hour  */}
								<select onChange={e => setStartTime({...startTime, hour: parseInt(e.target.value)})} value={startTime.hour} className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										hours.map((hour: number, i: number) => {
											return <option key={`${hour}a`} value={hour}> { `${hour < 10 ? '0' : ''}${hour}` } </option>
										})
									}
								</select>

								{/* minute  */}
								<select onChange={e => setStartTime({...startTime, minute: parseInt(e.target.value)})} value={startTime.minute} className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										minutes.map((minute: number, i: number) => {
											return <option key={`${minute}${i}`} value={minute}> { `${minute < 10 ? '0' : ''}${minute}` } </option>			
										})
									}
								</select>
							</div>

							{/* shift  */}
							<div className="mt-[7px] w-full">
								<select onChange={e => setStartTime({...startTime, shift: e.target.value})} value={startTime.shift} className="peer h-[48px] w-[217px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="AM">AM</option>
									<option value="PM">PM</option>
								</select>
							</div>
						</div>

						{/* end time  */}
						<div className="flex w-[250px] flex-wrap border-2 border-white rounded-[10px] p-2 relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<label className="w-[81px] h-full bg-primary-2 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									End time
								</label>
							</div>

							{/* hour and minute  */}
							<div className="flex w-full gap-x-[5px]">
								{/* hour  */}
								<select onChange={e => setEndTime({...endTime, hour: parseInt(e.target.value)})} value={endTime.hour} className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										hours.map((hour: number, i: number) => {
											return <option key={`${hour}b`} value={hour}> { `${hour < 10 ? '0' : ''}${hour}` } </option>
										})
									}
								</select>

								{/* minute  */}
								<select onChange={e => setEndTime({...endTime, minute: parseInt(e.target.value)})} value={endTime.minute} className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										minutes.map((minute: number, i: number) => {
											return <option key={`end${minute}${i}`} value={minute}> { `${minute < 10 ? '0' : ''}${minute}` } </option>			
										})
									}
								</select>
							</div>

							{/* shift  */}
							<div className="mt-[7px] w-full">
								<select onChange={e => setEndTime({...endTime, shift: e.target.value})} value={endTime.shift} className="peer h-[48px] w-[217px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="AM">AM</option>
									<option value="PM">PM</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
					{/* assigned faculty  */}
					<div className="pb-[50px]">
						<label className="text-white poppins font-semibold pb-[10px] text-[20px] ">
							Assigned Faculty
						</label>
						<select onChange={e => setFaculty(e.target.value)} value={faculty} className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							{
								allFaculties.data?.getAllFacultyWithFilters?.data?.map((faculty: Faculty) => {
									return <option key={`faculty${faculty.id}`} value={faculty.id}> {`${faculty.name.first} ${faculty.name.middle ? `${faculty.name.middle.charAt(0)}.` : ''} ${faculty.name.last} ${faculty.name.extension}${faculty.credentials !== '' ? `, ${faculty.credentials}` : ''}`} </option>
								})	
							}
							</select>
					</div>

					{/* dropdown for strand  */}
					<div className="flex w-[138px] gap-x-[30px] poppins">
						{/* <div className="flex w-[227px] flex-wrap rounded-[10px] relative pt-[15px]">
							<label className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold pb-[10px]">
								Strand
							</label>

							<div className="flex w-full gap-x-[10px]">
								<select className="peer h-[48px] w-[132px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										strands.map((strand: string) => {
											return <option key={`strand${strand}`} value={strand}> {strand} </option>
										})	
									}
								</select>
							</div>
					</div> */}

					{/* dropdown for grade level 
					<div className="flex flex-wrap rounded-[10px] relative pt-[15px]">
						<label className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold">
							Grade Level
						</label>

						<div className="flex w-full gap-x-[10px]">
							<select className="peer h-[48px] w-[137px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border 	placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value={11}>11</option>
								<option value={12}>12</option>
							</select>
						</div>
					</div> */}

					{/* dropdown for Section */}
					<div className="flex w-fit flex-wrap  rounded-[10px] relative pt-[15px]">
						<label className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold">
							Class
						</label>

						<div className="flex w-full gap-x-[10px]">
							<select onChange={e => setSClass(e.target.value)} value={sClass} className="peer h-[48px] w-[558px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									{
										allClass.data?.getAllClassWithFilters?.data?.flatMap((clss: Classs) => {
											return <option key={`class${clss.id}`} value={clss.id}>{clss.strand} {clss.year}-{clss.section}</option>
										})
									}
							</select>
						</div>
					</div>
				</div>
				</div>
			</div>
		</Wrapper>
  );
}
