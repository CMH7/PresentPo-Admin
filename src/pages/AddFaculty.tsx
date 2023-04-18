import Wrapper from "../components/Wrapper";

/*stated na page na yung 'Add Faculty'
after this, go to index.tsx to import the page*/
export default function AddFaculty() {
    return(
        <Wrapper>
            <div className="flex justify-between pt-10 px-56">
                <button className="bg-gray-700 hover:bg-[#1672ec] text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline"
                        type="button">Back</button>
                <h1 className="py-3 px-20 font-extrabold text-[#072d5f] text-3xl"
                        type="text">Add Faculty</h1>
                <button className="bg-[#11CF00] hover:bg-[#1672ec] text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit">Save</button>
            </div>

    <div className="mx-auto my-20 grid grid-cols-2 gap-x-64 poppins px-80">
        <div className="col-span-1">
            <form>
                <div className="pb-10">
                  <label className="block text-white poppins font-bold mb-3" for="last-name">Last Name</label><input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="last-name"
                        type="text"
                        placeholder="Enter your last name"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white poppins font-bold mb-3" for="first-name">First Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="first-name"
                            type="text"
                            placeholder="Enter your first name"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3" for="middle-name">Middle Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="middle-name"
                            type="text"
                            placeholder="Enter your middle name"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3" for="subjects-handled">Subjects Handled</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="subjects-handled"
                            type="text"
                            placeholder="Enter your subjects handled"/>
                </div>
            </form>
        </div>
        
        <div className="col-span-1">
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3" for="sections-handled">Sections Handled</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="sections-handled"
                            type="text"
                            placeholder="Enter your Sections Handled"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3" for="email">Email</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email address"/>
                </div>
            </form>
            <form>
                <div className="pb-10">
                    <label className="block text-white font-bold mb-3" for="password">Password</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"/>
                </div>
            </form>
        </div>
</div>
        </Wrapper>
    )
}

