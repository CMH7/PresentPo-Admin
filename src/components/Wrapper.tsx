import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  centered?: boolean;
  centerX?: boolean;
  centerY?: boolean;
}

export default function Wrapper({ children, centered = false, centerX = false, centerY = false }: WrapperProps) {
  // 'h-[100dvh] bg-gradient-to-br from-primary-0 to-primary-1 mont'

  const stylee = centered || ( centerX && centerY ) ? 'h-[100dvh] bg-gradient-to-br from-primary-0 via-primary-1 to-primary-2 mont flex flex-col justify-center items-center' : centerX ? 'h-[100dvh] bg-gradient-to-br from-primary-0 via-primary-1 to-primary-2 mont flex flex-col items-center' : centerY ? 'h-[100dvh] bg-gradient-to-br from-primary-0 via-primary-1 to-primary-2 flex flex-col justify-center mont' : 'h-[100dvh] bg-gradient-to-br from-primary-0 via-primary-1 to-primary-2 mont'

  return (
    <div className={stylee}>
      {children}
    </div>
  )
}
