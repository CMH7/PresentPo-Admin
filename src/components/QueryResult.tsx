import { PropagateLoader } from "react-spinners";
import logo from '../assets/PresentPo Logo.png'

//@ts-ignore
const QueryResult = ({ loading, error, data, children }) => {
  console.log(data)
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <div className="w-full h-fit flex flex-col items-center justify-center gap-y-5">
        <div className="w-24 rounded-full border-2 border-white overflow-hidden select-none">
          <img src={logo} alt="PresentPo Logo" />
        </div>
        <PropagateLoader color="#fff" />
      </div>
    );
  }
  if (!data || !data.studentsForManageStudentsPage) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResult;