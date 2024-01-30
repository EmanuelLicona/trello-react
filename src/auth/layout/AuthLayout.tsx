import { ReactNode } from 'react'

import './AuthLayout.css'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { AuthStatus } from '../enums/authStatus'
import { Loader } from '../../components/Loader/Loader'
export const AuthLayout = ({ children }: { children: ReactNode }) => {

  const { status } = useCheckAuth()


  return (
    <>
     {
      status === AuthStatus.CHECKING && <Loader />
     }
      <div className='auth-layout'>
        {children}
      </div>
    </>
  )
}
