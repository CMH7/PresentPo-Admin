import Wrapper from "../components/Wrapper";

/*stated na page na yung 'Edit Admin'
after this, go to index.tsx to import the page*/
export default function EditAdmin() {
    return(
        <Wrapper>
            <div className="flex justify-between pt-10 px-56">
                <button className="bg-gray-700 hover:bg-[#1672ec] text-white font-bold py-2 px-20 rounded-full leading-tight drop-shadow-xl outline outline-offset-2 outline-1 outline-gray-700"
                        type="button">Back</button>
                <h1 className="py-3 px-20 font-extrabold text-[#072d5f] text-3xl">Edit Admin</h1>
                <button className="bg-[#11CF00] hover:bg-[#1672ec] text-white font-bold py-2 px-20 rounded-full leading-tight drop-shadow-xl outline outline-offset-2 outline-1 outline-[#11CF00]"
                        type="submit">Save</button>
            </div>

    <div className="mx-auto my-20 grid grid-cols-2 gap-x-64 poppins px-80 drop-shadow-xl">
        <div className="col-span-1">
            <form>
                <div className="pb-10">
                  <label className="block text-white poppins font-bold mb-3">Last Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-2 focus:ring focus:outline-[#1672ec]"
                            id="last-name"
                            type="text"
                            placeholder="Enter last name"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white poppins font-bold mb-3">First Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-2 focus:ring focus:outline-[#1672ec]"
                            id="first-name"
                            type="text"
                            placeholder="Enter first name"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3">Middle Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-2 focus:ring focus:outline-[#1672ec]"
                            id="middle-name"
                            type="text"
                            placeholder="Enter middle name"/>
                </div>
            </form>
        </div>
        
        <div className="col-span-1">
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3">Email</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-2 focus:ring focus:outline-[#1672ec]"
                            id="email"
                            type="email"
                            placeholder="Enter email address"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3">Password</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-2 focus:ring focus:outline-[#1672ec]"
                            id="password"
                            type="password"
                            placeholder="Enter password"/>
                </div>
            </form>
        </div>
</div>
        </Wrapper>
    )
}

