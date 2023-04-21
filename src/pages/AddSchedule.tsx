import Wrapper from "../components/Wrapper";
import { Select, Option } from "@material-tailwind/react";
import backIcon from '../assets/left-arrow 1.png';

export default function AddSchedule() {
  return(
		<Wrapper>
			{/* top */}
			<div className="flex justify-between">

			{/* back button  */}
			<div className="flex items-center mt-[50px] ml-[100px]">
				<img className="w-[25px] h-[25px] mr-[30px]" src={backIcon} alt="back icon"
				/>
				{/* add button  */}
				<div className="poppins font-bold text-[40px] text-primary-2">
					Add Schedule
				</div>
			</div>

			{/* save button */}
			<button className="flex justify-center items-center mt-[50px] mr-[100px] bg-[#11CF00] hover:bg-[#1672ec] text-white font-semibold py-2 px-20 rounded-[50px] focus:outline-none focus:shadow-outline w-[218px] h-[55px]" type="submit">
				Add
			</button>
			</div>

			{/* parent - add 2 columns */}
			<div className=" grid grid-cols-2 gap-x-[175px] poppins px-80 mt-[238px]">

				{/* column 1 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							Subject Name
						</label>

						<select className="flex h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							<option value="subject-name1"></option>
							<option value="subject-name2"></option>
						</select>
					</div>

					<div className="pb-[20px]">
						<label className="block text-white poppins font-semibold">
							Schedule
						</label>
					</div>

					{/* for schedule day, start time, end time column */}
					<div className="flex w-[603px] gap-x-[10px] poppins">
						
						{/* dropdown for day  */}
						<div className="flex w-[227px] flex-wrap border-2 border-transparent rounded-[10px] relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<div className="w-[81px] h-full bg-primary-2 m-8 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									Day
								</div>
							</div>

							<div className="flex w-full gap-x-[10px]">
							<select className="peer h-[48px] w-[123px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
							<option value="monday">Mon</option>
									<option value="tuesday">Tue</option>
									<option value="wednesday">Wed</option>
									<option value="thursday">Thurs</option>
									<option value="friday">Fri</option>
									<option value="saturday">Sat</option>
									<option value="sunday">Sun</option>
							</select>
						</div>
						</div>
					

						{/* start time  */}
						<div className="flex w-[250px] flex-wrap border-2 border-primary-2 rounded-[10px] p-2 relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<div className="w-[81px] h-full bg-primary-2 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									Start time
								</div>
							</div>

							{/* hour and minute  */}
							<div className="flex w-full gap-x-[5px]">
								{/* hour  */}
								<select className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="">00</option>
									<option value="">01</option>
									<option value="">02</option>
									<option value="">03</option>
									<option value="">04</option>
									<option value="">05</option>
									<option value="">06</option>
									<option value="">07</option>
									<option value="">08</option>
									<option value="">09</option>
									<option value="">10</option>
									<option value="">11</option>
									<option value="">12</option>
								</select>

								{/* minute  */}
								<select className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="">00</option>
									<option value="">01</option>
									<option value="">02</option>
									<option value="">03</option>
									<option value="">04</option>
									<option value="">05</option>
									<option value="">06</option>
									<option value="">07</option>
									<option value="">08</option>
									<option value="">09</option>
									<option value="">10</option>
									<option value="">11</option>
									<option value="">12</option>
									<option value="">13</option>
									<option value="">14</option>
									<option value="">15</option>
									<option value="">16</option>
									<option value="">17</option>
									<option value="">18</option>
									<option value="">19</option>
									<option value="">20</option>
									<option value="">21</option>
									<option value="">22</option>
									<option value="">23</option>
									<option value="">24</option>
									<option value="">25</option>
									<option value="">26</option>
									<option value="">27</option>
									<option value="">28</option>
									<option value="">29</option>
									<option value="">30</option>
									<option value="">31</option>
									<option value="">32</option>
									<option value="">33</option>
									<option value="">34</option>
									<option value="">35</option>
									<option value="">36</option>
									<option value="">37</option>
									<option value="">38</option>
									<option value="">39</option>
									<option value="">40</option>
									<option value="">41</option>
									<option value="">42</option>
									<option value="">43</option>
									<option value="">44</option>
									<option value="">45</option>
									<option value="">46</option>
									<option value="">47</option>
									<option value="">48</option>
									<option value="">49</option>
									<option value="">50</option>
									<option value="">51</option>
									<option value="">52</option>
									<option value="">53</option>
									<option value="">54</option>
									<option value="">55</option>
									<option value="">56</option>
									<option value="">57</option>
									<option value="">58</option>
									<option value="">59</option>
									<option value="">60</option>
								</select>
							</div>

							{/* shift  */}
							<div className="mt-[7px] w-full">
								<select className="peer h-[48px] w-[217px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="am">AM</option>
									<option value="pm">PM</option>
								</select>
							</div>
						</div>

						{/* end time  */}
						<div className="flex w-[250px] flex-wrap border-2 border-primary-2 rounded-[10px] p-2 relative pt-[15px]">
							<div className="w-full h-[19px] flex justify-center items-center absolute left-0 -top-3">
								<div className="w-[81px] h-full bg-primary-2 text-white poppins font-semibold text-[14px] flex justify-center items-center rounded-[3px]">
									End time
								</div>
							</div>

							{/* hour and minute  */}
							<div className="flex w-full gap-x-[5px]">
								{/* hour  */}
								<select className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="">00</option>
									<option value="">01</option>
									<option value="">02</option>
									<option value="">03</option>
									<option value="">04</option>
									<option value="">05</option>
									<option value="">06</option>
									<option value="">07</option>
									<option value="">08</option>
									<option value="">09</option>
									<option value="">10</option>
									<option value="">11</option>
									<option value="">12</option>
								</select>

								{/* minute  */}
								<select className="peer h-[48px] w-2/4 rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="">00</option>
									<option value="">01</option>
									<option value="">02</option>
									<option value="">03</option>
									<option value="">04</option>
									<option value="">05</option>
									<option value="">06</option>
									<option value="">07</option>
									<option value="">08</option>
									<option value="">09</option>
									<option value="">10</option>
									<option value="">11</option>
									<option value="">12</option>
									<option value="">13</option>
									<option value="">14</option>
									<option value="">15</option>
									<option value="">16</option>
									<option value="">17</option>
									<option value="">18</option>
									<option value="">19</option>
									<option value="">20</option>
									<option value="">21</option>
									<option value="">22</option>
									<option value="">23</option>
									<option value="">24</option>
									<option value="">25</option>
									<option value="">26</option>
									<option value="">27</option>
									<option value="">28</option>
									<option value="">29</option>
									<option value="">30</option>
									<option value="">31</option>
									<option value="">32</option>
									<option value="">33</option>
									<option value="">34</option>
									<option value="">35</option>
									<option value="">36</option>
									<option value="">37</option>
									<option value="">38</option>
									<option value="">39</option>
									<option value="">40</option>
									<option value="">41</option>
									<option value="">42</option>
									<option value="">43</option>
									<option value="">44</option>
									<option value="">45</option>
									<option value="">46</option>
									<option value="">47</option>
									<option value="">48</option>
									<option value="">49</option>
									<option value="">50</option>
									<option value="">51</option>
									<option value="">52</option>
									<option value="">53</option>
									<option value="">54</option>
									<option value="">55</option>
									<option value="">56</option>
									<option value="">57</option>
									<option value="">58</option>
									<option value="">59</option>
									<option value="">60</option>
								</select>
							</div>

							{/* shift  */}
							<div className="mt-[7px] w-full">
								<select className="peer h-[48px] w-[217px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
									<option value="am">AM</option>
									<option value="pm">PM</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* column 2 */}
				<div className="col-span-1">
					<div className="pb-[50px]">
						<label className="block text-white poppins font-semibold pb-[10px]">
							Assigned Faculty
						</label>

							<select className="peer h-[48px] w-[558px] rounded-[10px] border border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="faculty1"></option>
								<option value="faculty2"></option>
								<option value="faculty3"></option>
							</select>
					</div>

					{/* dropdown for strand  */}
					<div className="flex w-[138px] gap-x-[30px] poppins">
						<div className="flex w-[227px] flex-wrap rounded-[10px] relative pt-[15px]">
							<div className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold pb-[10px]">
								Strand
							</div>

							<div className="flex w-full gap-x-[10px]">
								<select className="peer h-[48px] w-[132px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="abm">ABM</option>
										<option value="gas">GAS</option>
										<option value="humss">HUMSS</option>
										<option value="stem">STEM</option>
								</select>
							</div>
					</div>

					{/* dropdown for grade level  */}
					<div className="flex flex-wrap rounded-[10px] relative pt-[15px]">
						<div className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold">
							Grade Level
						</div>

						<div className="flex w-full gap-x-[10px]">
							<select className="peer h-[48px] w-[137px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border 	placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="grade11">11</option>
								<option value="grade12">12</option>
							</select>
						</div>
					</div>

					{/* dropdown for Section */}
					<div className="flex w-[227px] flex-wrap  rounded-[10px] relative pt-[15px]">
						<div className="flex justify-center items-center absolute left-0 -top-3 poppins text-white font-semibold">
							Section
						</div>

						<div className="flex w-full gap-x-[10px]">
							<select className="peer h-[48px] w-[235px] rounded-[10px] border-blue-gray-200 bg-white poppins text-[16px] font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 disabled:border-0 disabled:bg-blue-gray-50">
								<option value="section1"></option>
								<option value="section2"></option>
								<option value="section3"></option>
							</select>
						</div>
					</div>
				</div>
				</div>
			</div>
		</Wrapper>
  );
	}
