import { ReactNode } from 'react'

  export const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className=''>
      {children}
    </div>
  )
}
