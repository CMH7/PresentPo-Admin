import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useSelector } from 'react-redux'
import { selectAdmin } from "../selectors";


export default function Dashboard() {
  const admin = useSelector(selectAdmin)

  useEffect(() => {
    document.title = 'Dashboard';
  }, [])

  return (
    <Wrapper centered={true}>
      <div>
        {admin.name.first} {admin.name.middle} {admin.name.last} {admin.name.extension}
      </div>
    </Wrapper>
  )
}