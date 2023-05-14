import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  centered?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  klass?: string
}

export default function Wrapper({ children, centered = false, centerX = false, centerY = false, klass = '' }: WrapperProps) {
  // 'h-[100dvh] bg-gradient-to-br from-primary-0 to-primary-1 mont'

  let stylee = centered || (centerX && centerY) ? 'h-[100dvh] bg-primary-2 mont flex flex-col justify-center items-center' : centerX ? 'h-[100dvh] bg-primary-2 mont flex flex-col items-center' : centerY ? 'h-[100dvh] bg-primary-2 flex flex-col justify-center mont' : 'h-[100dvh] bg-primary-2 mont'
  
  stylee = `${stylee} ${klass}`

  return (
    <div className={stylee}>
      {children}
    </div>
  )
}
