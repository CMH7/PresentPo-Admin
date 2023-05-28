import { ReactNode } from 'react';
import refreshIcon from '../assets/refresh.png'
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

interface WrapperProps {
  children: ReactNode;
  centered?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  klass?: string
}

export default function Wrapper({ children, centered = false, centerX = false, centerY = false, klass = '' }: WrapperProps) {
  const currentLocation = location.href.split('/')[location.href.split('/').length - 1]
  
  const datee = new Date();
  const timeZone = 'Asia/Singapore';

  const zonedDate = utcToZonedTime(datee, timeZone);
  
  const formattedDate = format(zonedDate, "EEE, dd MMM yyyy hh:mm aa");

  let stylee = centered || (centerX && centerY) ? ' relative h-[100dvh] bg-primary-2 mont flex flex-col justify-center items-center' : centerX ? ' relative h-[100dvh] bg-primary-2 mont flex flex-col items-center' : centerY ? ' relative h-[100dvh] bg-primary-2 flex flex-col justify-center mont' : ' relative h-[100dvh] bg-primary-2 mont'
  
  stylee = `${stylee} ${klass}`

  return (
    <div className={stylee}>
      {children}

      <div
        onClick={() => {
          location.reload()
        }}
        className={` select-none cursor-pointer group text-white text-[15px] poppins rounded-tl-2xl z-50 absolute bottom-0 right-0 pr-[20px] py-2 pl-4 flex items-center justify-center ${currentLocation === 'admindashboard' ? 'bg-primary-2' : ''} `}>
        {/* as of  */}
        <div>
          Latest data as of {formattedDate}
        </div>

        {/* refresh button  */}
        <div className=' w-[50px] group-hover:w-auto bg-transparent group-hover:rounded-full group-hover:bg-white ml-0 group-hover:ml-2 transition-all h-fit overflow-clip flex items-center justify-center '>
          <div className=' group-hover:text-primary-2 border-l border-l-white pl-[10px] w-0 mx-0 group-hover:mx-2 group-hover:w-[65px] overflow-clip transition-all '>
            Refresh
          </div>
          <div>
            <img className='invert group-hover:filter-none' src={refreshIcon} alt="Refresh Icon from FlatIcon" />
          </div>
        </div>
      </div>


    </div>
  )
}
