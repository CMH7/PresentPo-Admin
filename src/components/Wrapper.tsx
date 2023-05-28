import { ReactNode } from 'react';
import refreshIcon from '../assets/refresh.png'

interface WrapperProps {
  children: ReactNode;
  centered?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  klass?: string
}

export default function Wrapper({ children, centered = false, centerX = false, centerY = false, klass = '' }: WrapperProps) {
  // 'h-[100dvh] bg-gradient-to-br from-primary-0 to-primary-1 mont'

  let stylee = centered || (centerX && centerY) ? ' relative h-[100dvh] bg-primary-2 mont flex flex-col justify-center items-center' : centerX ? ' relative h-[100dvh] bg-primary-2 mont flex flex-col items-center' : centerY ? ' relative h-[100dvh] bg-primary-2 flex flex-col justify-center mont' : ' relative h-[100dvh] bg-primary-2 mont'
  
  stylee = `${stylee} ${klass}`

  return (
    <div className={stylee}>
      {children}
      <div onClick={() => {
        location.reload()
      }} className=' cursor-pointer group absolute w-[60px] hover:w-[200px] transition-all h-[60px] hover:h-fit overflow-clip bottom-[50px] right-[50px] bg-white p-5 flex items-center justify-center gap-x-[10px] rounded-full '>
        <div className=' hidden group-hover:block font-bold poppins text-[18px] select-none '>
          Refresh
        </div>
        <div>
          <img src={refreshIcon} alt="Refresh Icon from FlatIcon" />
        </div>
      </div>
    </div>
  )
}
