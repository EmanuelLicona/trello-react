import { LogOut } from 'react-feather'
import { useAuthStore } from '../../hooks/useAuthStore'

import './Header.css'

export const Header = () => {

  const { startLogout, user } = useAuthStore()

  const handleLogout = () => {
    startLogout()
  }

  return (
    <header className="header">
      <div className="profile">
        {
          user?.photoURL && <img src={user?.photoURL} alt="Profile" />
        }
        <p>{user?.displayName}</p>

      </div>


      <div className='buttons'>
        <button onClick={handleLogout}><LogOut /></button>
      </div>
    </header>
  )
}
