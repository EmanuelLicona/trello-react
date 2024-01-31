import { LogOut } from 'react-feather'
import { useAuthStore } from '../../hooks/useAuthStore'

import UserImage from '../../assets/images/user_icon.webp'

export const Header = () => {

  const { startLogout, user } = useAuthStore()

  const handleLogout = () => {
    startLogout()
  }

  return (
    <header className="flex justify-between items-center border-b-2 px-3  bg-blue-500 text-white
    shadow-xl
    ">

      <div>
        <h1 className="text-3xl font-bold">Task kanban App</h1>
      </div>

      <div className="flex items-center justify-center gap-3 my-4">
        <div className='flex items-center gap-1'>
          {
            user?.photoURL && <img className="w-8 h-8 rounded-full" src={user?.photoURL}  alt="Profile"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = UserImage
              }}
            />
          }
          <p className="">{user?.displayName}</p>
        </div>

        <button 
        className="p-2 rounded-full bg-red-500 hover:bg-red-600"
        onClick={handleLogout}><LogOut /></button>
      </div>
    </header>
  )
}
