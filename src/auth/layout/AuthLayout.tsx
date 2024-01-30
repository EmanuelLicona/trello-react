import { ReactNode } from 'react'

import './AuthLayout.css'
  export const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}
